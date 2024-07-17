export declare class TranslateService {
    private payload;
    private payloadList;
    constructor();
    getPayload(): string;
    setPayload({ payload }: {
        payload: string;
    }): void;
    getPayloadList(): string[];
    translate(): {
        global: {
            userNotFound: string;
            success: {
                default: string;
                create: string;
                update: string;
                added: string;
            };
            danger: {
                default: string;
                create: string;
                update: string;
                added: string;
            };
        };
        auth: {
            register: {
                danger: {
                    emailInUser: string;
                    usernameInUser: string;
                };
            };
            login: {
                danger: {
                    default: string;
                    emailNotFound: string;
                    passwordCompare: string;
                };
                success: {
                    default: string;
                };
            };
        };
        flash: {
            welcome: string;
            accountCreate: string;
        };
    };
}
