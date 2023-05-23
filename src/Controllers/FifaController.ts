import { HotmarRequest } from '../Types/HotmarRequest';
import { HotmartResponse } from '../Types/HotmartResponse';
import axios from 'axios';

async function getDaySales(request: HotmarRequest) {
    
    const {data} = await axios.get<HotmartResponse>('https://api-sec-vlc.hotmart.com/security/oauth/token?grant_type=client_credentials', {
    params: {
        client_id : request.client_id,
        client_secret: request.client_secret
        }
    });
}
