
export const parseJson = (json: string): Object | boolean => {
    let ret: Object | boolean = false;
    try {
        ret = JSON.parse(json);
    } catch(error) {
        console.log("[ERROR] invalid json");
        console.log(json);
    }
    return ret;
}