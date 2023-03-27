import "./Login.scss";
import { Button, Checkbox, Form, Input, Card, message } from "antd";
import { history,useHistory,Redirect  } from "umi";
import { reqdoSQL } from "../../api/dosql";
//返回登录状态
const isLoginFn = async (values) => {
    console.log('%c [ values ]', 'font-size:13px; background:pink; color:#b22c02;', values);
    let loginState = {
        type: "",
        msg: "",
    };
    // let data = await reqdoSQL({ sqlprocedure: "afl_001" });
    let res = (await reqdoSQL({ sqlprocedure: "afl_001" })).rows[0];
    console.log('%c [ res ]', 'font-size:13px; background:pink; color:#b22c02;', res);
    if (values.username == res.username) {
        if (values.password === res.password) {
            loginState.type = "success";
            loginState.msg = "登录成功！";
            // navigate("/pages");
        } else {
            loginState.type = "warning";
            loginState.msg = "密码错误！";
        }
    } else {
        loginState.type = "error";
        loginState.msg = "用户不存在！";
    }
    return loginState;
};
function Login() {
    const [messageApi, contextHolder] = message.useMessage();
    // const navigate = useNavigate();
    // const history = useHistory();
    // 因为异步onFinish也要加async才能查看isLogin返回值
    const onFinish = async (values) => {
        let { type, msg } = await isLoginFn(values);
        messageApi.open({
            type: type,
            content: msg,
        }).then(() => {
            if(type === 'success'){
                // navigate("/login");
                // return redirect("/login")
                // history.push('/')
            }else if(type === 'error'){
                // navigate("/register")
            }
        })
    };
    const onFinishFailed = (errorInfo) => {};
    return (
        <>
            {contextHolder}
            <div className="wrap_container">
                <div className="whiteBg"></div>
                <div className="logoWrap">
                    <Card title="融资租赁管理系统" bordered={false} style={{ width: 500 }}>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off">
                            <Form.Item label="用户名" name="username" rules={[{ required: true, message: "请输入用户名！" }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item label="密码" name="password" rules={[{ required: true, message: "请输入密码！" }]}>
                                <Input.Password />
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                                <Checkbox>记住密码</Checkbox>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </div>
        </>
    );
}
export default Login;
