import { useState } from "react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import Template from "../Template";

type Props = {
    kcContext: Extract<KcContext, { pageId: "register.ftl" }>;
    i18n: I18n;
};

export default function Register({ kcContext, i18n }: Props) {
    const { url, messagesPerField, realm, profile, passwordRequired } = kcContext;
    const { msgStr } = i18n;
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const val = (name: string) => profile.attributesByName[name]?.value ?? "";
    const err = (name: string) =>
        messagesPerField.existsError(name) ? (
            <span
                className="sq-error"
                aria-live="polite"
                dangerouslySetInnerHTML={{ __html: messagesPerField.get(name) }}
            />
        ) : null;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            title={msgStr("sqCreateAccount")}
            subtitle={msgStr("sqCreateAccountSub")}
            footer={
                <>
                    {msgStr("sqHaveAccount")} <a href={url.loginUrl}>{msgStr("doLogIn")}</a>
                </>
            }
        >
            <form className="sq-form" action={url.registrationAction} method="post" onSubmit={() => setSubmitting(true)}>
                {"firstName" in profile.attributesByName && (
                    <div className="sq-field">
                        <label htmlFor="firstName">🧒 {msgStr("firstName")}</label>
                        <input id="firstName" name="firstName" type="text" dir="auto" defaultValue={val("firstName")} autoComplete="given-name" aria-invalid={messagesPerField.existsError("firstName")} />
                        {err("firstName")}
                    </div>
                )}

                {"lastName" in profile.attributesByName && (
                    <div className="sq-field">
                        <label htmlFor="lastName">{msgStr("lastName")}</label>
                        <input id="lastName" name="lastName" type="text" dir="auto" defaultValue={val("lastName")} autoComplete="family-name" aria-invalid={messagesPerField.existsError("lastName")} />
                        {err("lastName")}
                    </div>
                )}

                <div className="sq-field">
                    <label htmlFor="display_name">🌟 {msgStr("sqDisplayName")}</label>
                    <input id="display_name" name="display_name" type="text" dir="auto" defaultValue={val("display_name")} aria-invalid={messagesPerField.existsError("display_name")} />
                    {err("display_name")}
                </div>

                <div className="sq-field">
                    <label htmlFor="email">✉️ {msgStr("email")}</label>
                    <input id="email" name="email" type="email" defaultValue={val("email")} autoComplete="email" aria-invalid={messagesPerField.existsError("email")} />
                    {err("email")}
                </div>

                <div className="sq-field">
                    <label htmlFor="phoneNumber">📱 {msgStr("sqPhoneNumber")}</label>
                    <input id="phoneNumber" name="phoneNumber" type="tel" dir="ltr" defaultValue={val("phoneNumber")} autoComplete="tel" aria-invalid={messagesPerField.existsError("phoneNumber")} />
                    {err("phoneNumber")}
                </div>

                {!realm.registrationEmailAsUsername && (
                    <div className="sq-field">
                        <label htmlFor="username">{msgStr("username")}</label>
                        <input id="username" name="username" type="text" defaultValue={val("username")} autoComplete="username" aria-invalid={messagesPerField.existsError("username")} />
                        {err("username")}
                    </div>
                )}

                {passwordRequired && (
                    <>
                        <div className="sq-field">
                            <label htmlFor="password">🔒 {msgStr("password")}</label>
                            <div className="sq-password">
                                <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" aria-invalid={messagesPerField.existsError("password", "password-confirm")} />
                                <button type="button" className="sq-eye" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? msgStr("sqHidePassword") : msgStr("sqShowPassword")}>
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                            {err("password")}
                        </div>

                        <div className="sq-field">
                            <label htmlFor="password-confirm">{msgStr("passwordConfirm")}</label>
                            <input id="password-confirm" name="password-confirm" type={showPassword ? "text" : "password"} autoComplete="new-password" aria-invalid={messagesPerField.existsError("password-confirm")} />
                            {err("password-confirm")}
                        </div>
                    </>
                )}

                <button className="sq-btn" type="submit" disabled={submitting}>
                    {msgStr("doRegister")}
                </button>
            </form>
        </Template>
    );
}
