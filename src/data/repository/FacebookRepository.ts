import { FacebookRequest } from "../model/facebook/FacebookRequest";
import { FacebookResponse } from "../model/facebook/FacebookResponse";
import axios from 'axios';

export const fetchUrl = async (request: FacebookRequest, timeRange: string): Promise<FacebookResponse> => {
    const facebookId = "act_111843185574266"
    return axios.get(`https://graph.facebook.com/v17.0/act_111843185574266/insights`, {
        params: {
            fields: "spend",
            access_token: request.access_token,
            time_increment: 1,
            time_range: timeRange.toString()
        },
    }).then(function (response) {
        console.log(response.data.toString())
        return response.data
    }).catch(function (error) {
        console.log(error)
        return error
    });
};
