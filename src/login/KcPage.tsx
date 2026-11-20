import { Suspense, lazy } from "react";
import DefaultPage from "keycloakify/login/DefaultPage";
import DefaultTemplate from "keycloakify/login/Template";
import UserProfileFormFields from "keycloakify/login/UserProfileFormFields";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"));

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;
    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl":
                        return <Login kcContext={kcContext} i18n={i18n} />;
                    case "register.ftl":
                        return <Register kcContext={kcContext} i18n={i18n} />;
                    case "login-reset-password.ftl":
                        return <LoginResetPassword kcContext={kcContext} i18n={i18n} />;
                    default:
                        // All other pages (errors, OTP, verify email, ...) fall back to the default theme
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={{}}
                                Template={DefaultTemplate}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={true}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}
