/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(
  initialState: { currentUser?: API.CurrentUser; curUser: API.CurUser } | undefined,
) {
  const { currentUser, curUser } = initialState ?? {};
  return {
    isAdmin: currentUser && currentUser.access === 'admin',
    isUser: curUser && curUser.authority === 'user',
    canAccount: curUser,
  };
}
