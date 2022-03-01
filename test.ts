import fetch from "node-fetch"

async function getBreaks(totalCode: string, categoryCodes: string[], geoType: 'lad' | 'msoa' | 'lsoa'): Promise<{[key: string]: number[]}>{
    const url = `http://ec2-18-193-78-190.eu-central-1.compute.amazonaws.com:25252/ckmeans/2011?cat=${categoryCodes.toString()}&geotype=${geoType}&k=5&divide_by=${totalCode}`
    const response = await fetch(url)
    console.log(await response.json())
    const valentinasTest = await response.json()
    return valentinasTest
}

getBreaks("QS104EW0001", ["QS104EW0002"], "lad")