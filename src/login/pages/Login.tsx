import { useState } from "react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import Template from "../Template";

type Props = {
    kcContext: Extract<KcContext, { pageId: "login.ftl" }>;
    i18n: I18n;
};

export default function Login({ kcContext, i18n }: Props) {
    const { url, realm, login, usernameHidden, messagesPerField, social, auth, registrationDisabled } = kcContext;
    const { msgStr } = i18n;
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const hasError = messagesPerField.existsError("username", "password");
    const usernameLabel = !realm.loginWithEmailAllowed
        ? msgStr("username")
        : !realm.registrationEmailAsUsername
          ? msgStr("usernameOrEmail")
          : msgStr("email");

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            title={msgStr("sqWelcomeBack")}
            footer={
                realm.registrationAllowed &&
                !registrationDisabled && (
                    <>
                        {msgStr("noAccount")} <a href={url.registrationUrl}>{msgStr("doRegister")}</a>
                    </>
                )
            }
        >
            <form className="sq-form" action={url.loginAction} method="post" onSubmit={() => setSubmitting(true)}>
                {!usernameHidden && (
                    <div className="sq-field">
                        <label htmlFor="username">✉️ {usernameLabel}</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            defaultValue={login.username ?? ""}
                            autoFocus
                            autoComplete="username"
                            aria-invalid={hasError}
                        />
                    </div>
                )}

                <div className="sq-field">
                    <label htmlFor="password">🔒 {msgStr("password")}</label>
                    <div className="sq-password">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            aria-invalid={hasError}
                        />
                        <button
                            type="button"
                            className="sq-eye"
                            onClick={() => setShowPassword(v => !v)}
                            aria-label={showPassword ? msgStr("sqHidePassword") : msgStr("sqShowPassword")}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    {hasError && (
                        <span
                            className="sq-error"
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: messagesPerField.getFirstError("username", "password")
                            }}
                        />
                    )}
                </div>

                <div className="sq-row">
                    {realm.rememberMe && !usernameHidden ? (
                        <label className="sq-check">
                            <input type="checkbox" name="rememberMe" defaultChecked={!!login.rememberMe} />
                            {msgStr("rememberMe")}
                        </label>
                    ) : (
                        <span />
                    )}
                    {realm.resetPasswordAllowed && (
                        <a href={url.loginResetCredentialsUrl}>{msgStr("doForgotPassword")}</a>
                    )}
                </div>

                <input type="hidden" name="credentialId" value={auth.selectedCredential ?? ""} />

                <button className="sq-btn" type="submit" disabled={submitting}>
                    {msgStr("doLogIn")}
                </button>
            </form>

            {social?.providers !== undefined && social.providers.length > 0 && (
                <ul className="sq-social">
                    {social.providers.map(p => (
                        <li key={p.alias}>
                            <a className="sq-btn sq-btn-secondary" href={p.loginUrl}>
                                {p.displayName}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </Template>
    );
}
