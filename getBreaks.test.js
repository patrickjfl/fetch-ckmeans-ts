import { getBreaks } from "./getBreaks";
import fetch from 'node-fetch';
jest.mock('node-fetch', () => jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({ "catCode1": { LAD: [1, 2, 3, 4, 5] }, "catCode2": { LAD: [6, 7, 8, 9, 10] } }),
})));
describe("getBreaks function", () => {
    const totalCode = 'totalCatCode';
    const catCodes = ['catCode1', 'catCode2'];
    const geoType = 'lad';
    const url = "http://ec2-18-193-78-190.eu-central-1.compute.amazonaws.com:25252/ckmeans/2011?cat=catCode1,catCode2&geotype=lad&k=5&divide_by=totalCatCode";
    it("calls fetch with correct url", () => {
        getBreaks(totalCode, catCodes, geoType);
        expect(fetch).toHaveBeenCalledWith(url);
    });
    it("the fetch function returns correct data structure given valid arguments", async () => {
        const response = await fetch(url);
        const json = await response.json();
        expect(json).toStrictEqual({ "catCode1": { LAD: [1, 2, 3, 4, 5] }, "catCode2": { LAD: [6, 7, 8, 9, 10] } });
        await expect((await fetch(url)).json()).resolves.toStrictEqual({ "catCode1": { LAD: [1, 2, 3, 4, 5] }, "catCode2": { LAD: [6, 7, 8, 9, 10] } });
    });
    it("the getBreaks function returns correct data structure", async () => {
        const dataBreaksStruc = { "catCode1": [1, 2, 3, 4, 5], "catCode2": [6, 7, 8, 9, 10] };
        expect(await getBreaks(totalCode, catCodes, geoType)).toStrictEqual(dataBreaksStruc);
    });
});
