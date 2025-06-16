import 'dotenv/config';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import databaseConfigDev from 'src/modules/database/database.config.dev';
import { Residence } from 'src/modules/api/residence/entities/residence.entity';
import { User, UserRole } from 'src/modules/api/user/entities/user.entity';
import {
  Document,
  DocumentAccess,
  DocumentType,
} from 'src/modules/api/document/entities/document.entity';
import {
  Incident,
  IncidentPriority,
  IncidentStatus,
} from 'src/modules/api/incident/entities/incident.entity';
import { VoteSession } from 'src/modules/api/vote-session/entities/vote-session.entity';
import { Vote, VoteValue } from 'src/modules/api/vote/entities/vote.entity';
import { hashSync } from 'bcrypt';

async function seed() {
  const dataSource = new DataSource({
    ...databaseConfigDev(),
    dropSchema: true,
  });
  await dataSource.initialize();

  const residence = dataSource.manager.create(Residence, {
    name: 'Résidence Les Acacias',
    slug: 'les-acacias',
    logoUrl: faker.image.urlPicsumPhotos({ width: 600, height: 400 }),
    primaryColor: '#2e7d32',
  });
  await dataSource.manager.save(residence);

  const users: User[] = [];
  for (let i = 0; i < 5; i++) {
    const role = i < 2 ? UserRole.ADMIN : UserRole.RESIDENT;
    const user = dataSource.manager.create(User, {
      residence,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      role,
      passwordHash: hashSync(faker.internet.password(), 10),
    });
    users.push(await dataSource.manager.save(user));
  }

  const docs = ["PV d'AG", 'Convocation', 'Contrat de nettoyage'];
  for (const title of docs) {
    await dataSource.manager.save(Document, {
      residence,
      uploadedBy: users[0],
      title,
      url: faker.internet.url(),
      type: DocumentType.CONVOCATION,
      access: DocumentAccess.PUBLIC,
    });
  }

  for (let i = 0; i < 2; i++) {
    await dataSource.manager.save(Incident, {
      residence,
      reportedBy: users[i + 1],
      title: `Incident #${i + 1}`,
      description: faker.lorem.paragraph(),
      photoUrl: faker.image.url(),
      priority: IncidentPriority.MEDIUM,
      status: IncidentStatus.OPEN,
    });
  }

  const voteSession = dataSource.manager.create(VoteSession, {
    residence,
    title: 'Vote: Rénovation du hall',
    isOpen: true,
    closesAt: faker.date.soon(),
  });
  await dataSource.manager.save(voteSession);

  for (const user of users) {
    await dataSource.manager.save(Vote, {
      session: voteSession,
      voter: user,
      value: faker.helpers.arrayElement([
        VoteValue.YES,
        VoteValue.NO,
        VoteValue.ABSTAIN,
      ]),
      weight: 1,
    });
  }

  console.log('✅ Seeding complete');
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Seeding failed', err);
  process.exit(1);
});
