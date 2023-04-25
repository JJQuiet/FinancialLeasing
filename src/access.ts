/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(
  initialState: { currentUser?: { authority: string } } | undefined,
  // initialState: { currentUser?: API.CurrentUser & { authority: string }} | undefined,
) {
  const { authority } = initialState?.currentUser ?? {};
  return {
    // is_user: initialState?.currentUser,
    is_newcomer: authority === 'newcomer',
    is_tenantry: authority === 'tenantry',
    is_super_admin: authority === 'super_admin',
    is_business_admin: authority === 'business_admin',
    is_project_audit_admin: authority === 'project_audit_admin',
    is_financial_audit_admin: authority === 'financial_audit_admin',
    super_admin_business_admin: authority === 'super_admin' || authority === 'business_admin',
  };
}
