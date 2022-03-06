// import api from 'shared/api';
// import { LoginDTO } from 'shared/api/auth';
// import { Response } from 'shared/api/config';

// enum CubicStatus {
//   CUBIC_AUTH = 'cubic-auth',
//   CUBIC_IS_NOT_AUTH = 'cubic-is-not-auth',
// }

// class Auth {
//   api = api.auth;
//   history: any;
//   constructor(history: any) {
//     this.history = history;
//   }

//   move(path: string) {
//     const { history } = this;
//     const { pathname } = history.location;

//     switch (path) {
//       case 'auth':
//         return history.push('/auth');

//       case 'home':
//         if (
//           pathname.startsWith('/auth') ||
//           pathname.startsWith('/activation') ||
//           pathname === '/'
//         ) {
//           history.push('/home');
//         }
//         return;
//       case 'activation':
//         return history.push('/activation/step-1');

//       default:
//         return;
//     }
//   }

//   async check() {
//     try {
//       const res: Response<any> = await this.api.status();
//       if (res.msg === CubicStatus.CUBIC_AUTH) {
//         this.move('home');
//       } else if (res.msg === CubicStatus.CUBIC_IS_NOT_AUTH) {
//         this.move('auth');
//       } else {
//         this.move('activation');
//       }
//       return res;
//     } catch (error) {
//       console.error('[Auth] check error', error);
//     }
//   }

//   async logIn({ login, password }: LoginDTO) {
//     const res = await this.api.login({ login, password });
//     await this.check();
//     return res;
//   }

//   async logOut() {
//     await this.api.logout();
//     await this.check();
//   }
// }

// export { Auth };

export {};
