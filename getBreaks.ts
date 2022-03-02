import fetch from "node-fetch"
import LRU from "lru-cache"

export async function getBreaks(totalCode: string, catCodes: string[], geoType: 'lad' | 'msoa' | 'lsoa'):Promise<{[key: string]: number[]}>{
    const url = `http://ec2-18-193-78-190.eu-central-1.compute.amazonaws.com:25252/ckmeans/2011?cat=${catCodes.toString()}&geotype=${geoType}&k=5&divide_by=${totalCode}`
            const response= await fetch(url)
            const json = await response.json()
            let dataBreaks:{[key: number]: number[]}={}
            catCodes.forEach((catCode)=>{
            dataBreaks[catCode]=json[catCode][geoType.toUpperCase()]
    })
    return dataBreaks
}
