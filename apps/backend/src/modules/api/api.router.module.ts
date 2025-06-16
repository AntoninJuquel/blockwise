import { RouteTree } from '@nestjs/core';
import { ResidenceModule } from './residence/residence.module';
import { UserModule } from './user/user.module';
import { IncidentModule } from './incident/incident.module';
import { VoteSessionModule } from './vote-session/vote-session.module';
import { DocumentModule } from './document/document.module';
import { VoteModule } from './vote/vote.module';
import { AnnouncementModule } from './announcement/announcement.module';

export const ApiRouterProvider = [
  ResidenceModule,
  UserModule,
  IncidentModule,
  VoteSessionModule,
  DocumentModule,
  VoteModule,
  AnnouncementModule,
];

const apiRouter: RouteTree = {
  path: 'api',
  children: ApiRouterProvider,
};

export default apiRouter;
