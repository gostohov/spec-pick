import './main.scss';
import "reflect-metadata";
import AppModule from './js/app.module';

const appModule = new AppModule();
appModule.forRoot();