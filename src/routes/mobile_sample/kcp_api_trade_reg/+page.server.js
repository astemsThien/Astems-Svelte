// +page.server.js
import fetch from 'node-fetch';


/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {

        const KCP_CERT_INFO = '-----BEGIN CERTIFICATE-----MIIDgTCCAmmgAwIBAgIHBy4lYNG7ojANBgkqhkiG9w0BAQsFADBzMQswCQYDVQQGEwJLUjEOMAwGA1UECAwFU2VvdWwxEDAOBgNVBAcMB0d1cm8tZ3UxFTATBgNVBAoMDE5ITktDUCBDb3JwLjETMBEGA1UECwwKSVQgQ2VudGVyLjEWMBQGA1UEAwwNc3BsLmtjcC5jby5rcjAeFw0yMTA2MjkwMDM0MzdaFw0yNjA2MjgwMDM0MzdaMHAxCzAJBgNVBAYTAktSMQ4wDAYDVQQIDAVTZW91bDEQMA4GA1UEBwwHR3Vyby1ndTERMA8GA1UECgwITG9jYWxXZWIxETAPBgNVBAsMCERFVlBHV0VCMRkwFwYDVQQDDBAyMDIxMDYyOTEwMDAwMDI0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAppkVQkU4SwNTYbIUaNDVhu2w1uvG4qip0U7h9n90cLfKymIRKDiebLhLIVFctuhTmgY7tkE7yQTNkD+jXHYufQ/qj06ukwf1BtqUVru9mqa7ysU298B6l9v0Fv8h3ztTYvfHEBmpB6AoZDBChMEua7Or/L3C2vYtU/6lWLjBT1xwXVLvNN/7XpQokuWq0rnjSRThcXrDpWMbqYYUt/CL7YHosfBazAXLoN5JvTd1O9C3FPxLxwcIAI9H8SbWIQKhap7JeA/IUP1Vk4K/o3Yiytl6Aqh3U1egHfEdWNqwpaiHPuM/jsDkVzuS9FV4RCdcBEsRPnAWHz10w8CX7e7zdwIDAQABox0wGzAOBgNVHQ8BAf8EBAMCB4AwCQYDVR0TBAIwADANBgkqhkiG9w0BAQsFAAOCAQEAg9lYy+dM/8Dnz4COc+XIjEwr4FeC9ExnWaaxH6GlWjJbB94O2L26arrjT2hGl9jUzwd+BdvTGdNCpEjOz3KEq8yJhcu5mFxMskLnHNo1lg5qtydIID6eSgew3vm6d7b3O6pYd+NHdHQsuMw5S5z1m+0TbBQkb6A9RKE1md5/Yw+NymDy+c4NaKsbxepw+HtSOnma/R7TErQ/8qVioIthEpwbqyjgIoGzgOdEFsF9mfkt/5k6rR0WX8xzcro5XSB3T+oecMS54j0+nHyoS96/llRLqFDBUfWn5Cay7pJNWXCnw4jIiBsTBa3q95RVRyMEcDgPwugMXPXGBwNoMOOpuQ==-----END CERTIFICATE-----'

        const formData = await request.formData()
        // console.log(formData);

        // const JSON = JSON.stringify(Object.fromEntries(formData))
        // return JSON
        
        const actionResult = formData.get('ActionResult')
        const van_code = formData.get('van_code')
        const post_data = {
            actionResult: actionResult,
            van_code: van_code
        };        
        const req_data = {
            site_cd: formData.get('site_cd'),
            kcp_cert_info: KCP_CERT_INFO,
            ordr_idxx: formData.get('ordr_idxx'),
            good_mny: formData.get('good_mny') ,
            good_name: formData.get('good_name') ,
            pay_method: formData.get('pay_method'),
            Ret_URL: formData.get('Ret_URL'),
            escw_used: 'N',            
            user_agent: '',             
        };
        

        // 거래등록 API URL
        // 개발 : https://stg-spl.kcp.co.kr/std/tradeReg/register
        // 운영 : https://spl.kcp.co.kr/std/tradeReg/register
        
        // console.log(req_data);
        
        let res_data =  await fetch("https://stg-spl.kcp.co.kr/std/tradeReg/register", {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(req_data),            
                    })
                    // 거래등록 API RES
                    .then(response => {                        
                        return response.json() 
                    })
        
        let data = Object.assign(req_data, res_data, post_data)
        
        console.log(data);
                
        return data
             
        
    }
}

        
        
        
    
