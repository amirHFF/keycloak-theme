import { useEffect, type ReactNode } from "react";
import type { KcContext } from "./KcContext";
import type { I18n } from "./i18n";
import logo from "./assets/simorq-logo.png";
import "./login.css";

type Props = {
    kcContext: KcContext;
    i18n: I18n;
    title: string;
    subtitle?: string;
    children: ReactNode;
    footer?: ReactNode;
};

export default function Template({ kcContext, i18n, title, subtitle, children, footer }: Props) {
const { currentLanguage, enabledLanguages, msgStr } = i18n;
const currentLanguageTag = currentLanguage.languageTag;
    const isRtl = ["fa", "ar", "he", "ur"].includes(currentLanguageTag);
    const message = "message" in kcContext ? kcContext.message : undefined;

    useEffect(() => {
        document.documentElement.lang = currentLanguageTag;
        document.documentElement.dir = isRtl ? "rtl" : "ltr";
    }, [currentLanguageTag, isRtl]);

    return (
        <div className="sq-auth">
            <div className="sq-blob sq-blob1" />
            <div className="sq-blob sq-blob2" />
            <div className="sq-blob sq-blob3" />

            {enabledLanguages.length > 1 && (
                <select
                    className="sq-lang"
                    aria-label="Language"
                    value={currentLanguageTag}
                    onChange={e => {
                        const l = enabledLanguages.find(x => x.languageTag === e.target.value);
                        if (l) window.location.href = l.href;
                    }}
                >
                    {enabledLanguages.map(l => (
                        <option key={l.languageTag} value={l.languageTag}>
                            {l.label}
                        </option>
                    ))}
                </select>
            )}

            <main className="sq-card">
                <div className="sq-logo-wrap">
                    <div className="sq-logo-ring" />
                    <img src={logo} alt={msgStr("sqWelcomeBack")} className="sq-logo" />
                </div>

                <h1 className="sq-title">{title}</h1>
                {subtitle && <p className="sq-subtitle">{subtitle}</p>}

                {message && (
                    <div className={`sq-alert sq-alert-${message.type}`} role="alert">
                        <span dangerouslySetInnerHTML={{ __html: message.summary }} />
                    </div>
                )}

                {children}

                {footer && <div className="sq-footer">{footer}</div>}
            </main>
        </div>
    );
}
