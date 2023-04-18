/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(
  initialState: { currentUser?: API.CurrentUser;} | undefined,
) {
  const { currentUser } = initialState ?? {};
  return {
    isUser: currentUser && currentUser.authority === 'user',
    canAccount: currentUser,
    isBusiness_admin: currentUser && currentUser.authority === 'business_admin',
  };
}
