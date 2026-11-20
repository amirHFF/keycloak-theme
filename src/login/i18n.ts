import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        en: {
            sqWelcomeBack: "Welcome back, ready to learn?",
            sqCreateAccount: "Create your account",
            sqCreateAccountSub: "Let's set up your learning profile!",
            sqResetTitle: "Forgot your password?",
            sqResetSub: "Enter your email and we'll send you a reset link.",
            sqHaveAccount: "Already have an account?",
            sqDisplayName: "Display name",
            sqPhoneNumber: "Phone number",
            sqShowPassword: "Show password",
            sqHidePassword: "Hide password"
        },
        fa: {
            sqWelcomeBack: "خوش برگشتی! آماده‌ی یادگیری هستی؟",
            sqCreateAccount: "حساب کاربری خودت را بساز",
            sqCreateAccountSub: "بیا پروفایل یادگیری‌ات را بسازیم!",
            sqResetTitle: "رمز عبورت را فراموش کرده‌ای؟",
            sqResetSub: "ایمیلت را وارد کن تا لینک بازیابی برایت بفرستیم.",
            sqHaveAccount: "قبلاً ثبت‌نام کرده‌ای؟",
            sqDisplayName: "نام نمایشی",
            sqPhoneNumber: "شماره موبایل",
            sqShowPassword: "نمایش رمز",
            sqHidePassword: "مخفی کردن رمز"
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
