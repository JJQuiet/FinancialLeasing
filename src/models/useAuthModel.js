// import { useState, useCallback } from 'react';
// import  {CurUser as ccurUser} from '../services/typings.d';
// export default function useAuthModel() {
//   const [curUser, setCurUser] = useState <ccurUser> {};
//   // const [user, setUser] = useState(null)

//   const signin = useCallback(async (values) => {
//     console.log('%c [ signin values ]', 'font-size:13px; background:pink; color:#b22c02;', values);
//     // const signin = useCallback(async (account, password) => {
//     // signin implementation
//     // setUser(user from signin API)
//     let res = await request('/doSQL', {
//       params: {
//         paramvalues: JSON.stringify({
//           sqlprocedure: 'b01_login01',
//           phone_or_email: values.username,
//           password: values.password,
//         }),
//       },
//     }).then(async (res) => {
//       if (res && res.rows && res.rows.length === 1) {
//         let res_curUser = await request('/doSQL', {
//           sqlprocedure: 'b03_login_curUser',
//           phone_or_email: values.username,
//           authority: res.rows[0].authority,
//         });
//         setCurUser(res_curUser.rows[0])
//         console.log('%c [ res_curUser ]', 'font-size:13px; background:pink; color:#b22c02;', res_curUser);
//         return true;
//       }
//     });
//   }, []);
//   // const signin = useCallback((account, password) => {
//   //   // signin implementation
//   //   // setUser(user from signin API)
//   // }, [])

//   // const signout = useCallback(() => {
//   //   // signout implementation
//   //   // setUser(null)
//   // }, [])

//   return {
//     curUser,
//     signin,
//     // signout
//   };
// }
