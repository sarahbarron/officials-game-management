export function queryString(unparsed) {
	const separated = unparsed.replace("?", "").split("&");
	if (!separated) return {};

	const query = {};
	for (let item of separated) {
		const x = item.split("=");
		query[x[0]] = x[1];
	}
	return query;
}

export let convertTimestampToDate = (timestamp) => {
    try {
        if (timestamp != null && timestamp != undefined) {
            let date = timestamp.toDate();
            date = date.toDateString();
            return date;
        }
        else {
            return "";
        }
    }
    catch (e) {
        console.log("convertTimestampToDate exception: " + e);
    }
}

export let convertTimestampToTime = (timestamp) => {
    try {
        if (timestamp != null && timestamp != undefined) {
            const date = timestamp.toDate();
            const hour = date.getHours();
            let mins = date.getMinutes();
            if (mins < 10) {
                mins = `0${mins}`;
            }
            const time = `${hour}:${mins}`;
            return time;
        }
        else {
            return "";
        }
    } catch (e) {
        console.log("convertTimestampToTime exception: " + e);
    }
}

export let removeDuplicateObjectsFromArray = (games) =>{
    try{
        let check = new Set();
        let reduced_games = games.filter(
            (obj) => !check.has(obj.id) && check.add(obj.id)
        );
        return reduced_games;
    }catch(e){console.log("removeDuplicateObjects exception: "+e)}
}