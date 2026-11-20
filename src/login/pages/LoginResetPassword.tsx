import { useState } from "react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import Template from "../Template";

type Props = {
    kcContext: Extract<KcContext, { pageId: "login-reset-password.ftl" }>;
    i18n: I18n;
};

export default function LoginResetPassword({ kcContext, i18n }: Props) {
    const { url, auth, messagesPerField, realm } = kcContext;
    const { msgStr } = i18n;
    const [submitting, setSubmitting] = useState(false);
    const hasError = messagesPerField.existsError("username");

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            title={msgStr("sqResetTitle")}
            subtitle={msgStr("sqResetSub")}
            footer={<a href={url.loginUrl}>{msgStr("backToLogin")}</a>}
        >
            <form className="sq-form" action={url.loginAction} method="post" onSubmit={() => setSubmitting(true)}>
                <div className="sq-field">
                    <label htmlFor="username">
                        ✉️ {!realm.loginWithEmailAllowed ? msgStr("username") : msgStr("usernameOrEmail")}
                    </label>
                    <input id="username" name="username" type="text" autoFocus defaultValue={auth.attemptedUsername ?? ""} aria-invalid={hasError} />
                    {hasError && (
                        <span className="sq-error" aria-live="polite" dangerouslySetInnerHTML={{ __html: messagesPerField.get("username") }} />
                    )}
                </div>

                <button className="sq-btn" type="submit" disabled={submitting}>
                    {msgStr("doSubmit")}
                </button>
            </form>
        </Template>
    );
}
