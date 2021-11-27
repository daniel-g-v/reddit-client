//format votes to shorter display e.g: 12345 -> 12.3k

export const formatUpVotes = (ups) => {
    const upsString = ups.toString();
    let formatedVotes = '';
    switch (upsString.length) {
        case 4: 
            formatedVotes = `${upsString[0]},${upsString[1]}K`;
            return formatedVotes;
        case 5: 
            formatedVotes = `${upsString[0]}${upsString[1]},${upsString[2]}K`;
            return formatedVotes;

        case 6: 
            formatedVotes = `${upsString[0]}${upsString[1]}${upsString[2]},${upsString[3]}K`;
            return formatedVotes;
        
        default: 
            return upsString
    }
};  

