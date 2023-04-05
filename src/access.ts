/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(
  initialState: { currentUser?: API.CurrentUser; curUser: API.CurUser } | undefined,
) {
  const { currentUser, curUser } = initialState ?? {};
  console.log('%c [ curUser ]', 'font-size:13px; background:pink; color:#b22c02;', curUser);
  return {
    isUser: curUser && curUser.authority === 'user',
    canAccount: curUser,
    isBusiness_admin: curUser && curUser.authority === 'business_admin',
  };
}
