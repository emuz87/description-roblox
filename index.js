import fetch from "node-fetch";
import converter from "number-to-words";

const myBirthday = 1677196800000;

const cookie = ".ROBLOSECURITY="+process.env.COOKIE;
console.log(cookie);

class DescriptionChanger {
    constructor(cookie) {
        this.cookie = cookie
    }

    async step(txt) {
        const res = await fetch("https://accountinformation.roblox.com/v1/description", {
            method: "POST",
            body: `{"description":"${txt}"}`,
            headers: {
                "Content-Type": "application/json",
                "Cookie": this.cookie,
                "X-CSRF-Token": this.token,
                "Origin": "https://www.roblox.com",
                "Referer": "https://www.roblox.com/",
                "X-Requested-With": "XMLHttpRequest"
            }
        });
        if (res.status == 403) {
            this.token = res.headers.get("x-csrf-token");
        }
        return res.status;
    }
}

class DateDescriptionChanger extends DescriptionChanger {
    constructor(cookie, date) {
        super(cookie);
        this.date = date;
    }

    async step() {
        return await super.step(`minutes until my birthday:\n${converter.toWords(((this.date-new Date().getTime())/1000)/60)}`);
    }
}

const x = new DateDescriptionChanger(cookie, myBirthday);
setInterval(async () => {
    console.log(await x.step());
}, 61000)