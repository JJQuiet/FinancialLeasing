/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(
  initialState: { currentUser?: API.CurrentUser; curUser: API.CurUser } | undefined,
) {
  const { currentUser, curUser } = initialState ?? {};
  return {
    isUser: curUser && curUser.authority === 'user',
    canAccount: curUser,
    isBusiness_admin: curUser && curUser.authority === 'business_admin',
  };
}
