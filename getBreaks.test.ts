import {getBreaks} from "./getBreaks"
import fetch from 'node-fetch';

jest.mock('node-fetch', () => jest.fn());

describe("getBreaks function", () => {
    const totalCode = 'QS104EW0001'
    const catCodes = ['QS104EW0002', 'QS104EW0003']
    const geoType = 'lad'
    it("calls fetch with correct url", () => {
        getBreaks(totalCode, catCodes, geoType)
        expect(fetch).toHaveBeenCalledWith("http://ec2-18-193-78-190.eu-central-1.compute.amazonaws.com:25252/ckmeans/2011?cat=QS104EW0002,QS104EW0003&geotype=lad&k=5&divide_by=QS104EW0001")
    })
    it("returns correct data structure given valid arguments", () => {

    })
})