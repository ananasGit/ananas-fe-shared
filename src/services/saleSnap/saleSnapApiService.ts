const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

interface ContactData {
    email: string;
    firstname?: string;
    lastname?: string;
    birthday?: string;
    pol?: string;
    kupac?: string;
    abandoned_cart?: string;
    tags?: string | string[];
}

class SaleSnapAPIService {
    OAuthTokenExpirationDate: Date | undefined;
    headers = {};
    SALES_SNAP_URL = '';
    SALESNAP_CLIENT_ID = '';
    SALESNAP_CLIENT_SECRET = '';

    constructor(baseUrl: string, clientId: string, clientSecret: string) {
        this.SALES_SNAP_URL = baseUrl;
        this.SALESNAP_CLIENT_ID = clientId;
        this.SALESNAP_CLIENT_SECRET = clientSecret;
        this.getOauthHeadersWithToken();
    }

    getOauthHeadersWithToken = async () => {
        try {
            const response = await fetch(
                `${this.SALES_SNAP_URL}/oauth/v2/token?grant_type=client_credentials&client_id=${this.SALESNAP_CLIENT_ID}&client_secret=${this.SALESNAP_CLIENT_SECRET}`,
                {
                    method: 'GET',
                    headers,
                },
            );
            const OAuthTokenData = (await response.json()) as {
                access_token: string;
                expires_in: string;
            };
            this.headers = {
                ...headers,
                Authorization: `Bearer ${OAuthTokenData.access_token}`,
            };
            this.OAuthTokenExpirationDate = new Date(
                new Date().getTime() + parseInt(OAuthTokenData.expires_in, 10) * 1000,
            );
        } catch (error) {
            console.log('SS contact/user error', { err: error });
        }
    };

    isOAuthTokenExpired = () => {
        return this.OAuthTokenExpirationDate
            ? this.OAuthTokenExpirationDate > new Date()
            : false;
    };

    refreshToken = async () => {
        if (this.isOAuthTokenExpired()) {
            await this.getOauthHeadersWithToken();
        }
    };

    getContactsById = async (id: string | number) => {
        await this.refreshToken();
        const response = await fetch(`${this.SALES_SNAP_URL}/api/contacts/${id}`, {
            headers: this.headers,
        });
        return (await response.json()) as
            | { contact?: { fields?: { all?: { email?: string | null } } } }
            | undefined;
    };

    contactsEdit = async (id: string | number, body: ContactData) => {
        await this.refreshToken();
        const response = await fetch(`${this.SALES_SNAP_URL}/api/contacts/${id}/edit`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(body),
        });
        return (await response.json()) as { contact?: { id?: number } } | undefined;
    };

    tipperShare = async (id: string | number, body: Record<string, unknown>) => {
        await this.refreshToken();
        const response = await fetch(`${this.SALES_SNAP_URL}/api/tipper/${id}/share`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body),
        });
        return (await response.json()) as { id?: string };
    };

    mtcEvent = async (body: Record<string, unknown>) => {
        const response = await fetch(`${this.SALES_SNAP_URL}/mtc/event`, {
            method: 'POST',
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json',
                Accept: '*.*',
                Connection: 'keep-alive',
                /** WARNING: Server evaluate User-Agent
                 1. react-native-debugger override User-Agent (do debug in terminal)
                 2. default User-Agent will return {id: null, sid: null, device_id: null}
                 */
                'User-Agent': 'PostmanRuntime/7.29.4',
            },
            credentials: 'omit',
            body: JSON.stringify(body),
        });
        return (await response.json()) as { device_id?: string; id?: string };
    };
}

export default SaleSnapAPIService;