// ==UserScript==
// @name         Platoboost Bypass
// @version      3.0
// @description  Bypass Delta Key System
// @author       Ekky
// @match        https://loot-link.com/s?*
// @match        https://loot-links.com/s?*
// @match        https://lootlink.org/s?*
// @match        https://lootlinks.co/s?*
// @match        https://gateway.platoboost.com/a/8?id=*
// @match        https://gateway.platoboost.com/a/2?id=*
// @match        https://lootdest.info/s?*
// @match        https://lootdest.org/s?*
// @match        https://lootdest.com/s?*
// @match        https://links-loot.com/s?*
// @match        https://linksloot.net/s?*
// @run-at       document-end
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @grant        GM_openInTab
// @connect      api-gateway.platoboost.com
// @icon         https://cdn.discordapp.com/avatars/781051635928531015/e5164a9339d9f6c9d354219289165400.png?size=4096
// @namespace    Ekky
// @license      do-not-distribute
// @license      MIT
// ==/UserScript==

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function delta() {
    const id = new URL(window.location.href).searchParams.get("id");
    const data = await (await fetch("https://api-gateway.platoboost.com/v1/authenticators/8/" + id)).json();

    if (data.key) return;

    const token = new URL(window.location.href).searchParams.get("tk");
    if (token) {
        await sleep(3100);
        await fetch(`https://api-gateway.platoboost.com/v1/sessions/auth/8/${id}/${token}`, {
            method: "PUT"
        }).then(async (res) => {
            const data = await res.json();
            window.location.assign(data.redirect);
        }).catch(error => {
            alert("An Error Occurred During Authentication" + error);
        });
    } else {
        let response = await fetch(`https://api-gateway.platoboost.com/v1/sessions/auth/8/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        });

        if (response.status === 500) {
            return alert('Please solve the hCaptcha!');
        }
        response = await response.json();
        await sleep(1000);
        let decodeUrl = decodeURIComponent(response.redirect);
        let r = new URL(decodeUrl).searchParams.get("r");
        let c = atob(r);
        window.location.assign(c);
    }
}

async function deltaIOS() {
    const id = new URL(window.location.href).searchParams.get("id");
    const data = await (await fetch("https://api-gateway.platoboost.com/v1/authenticators/2/" + id)).json();

    if (data.key) return;

    const token = new URL(window.location.href).searchParams.get("tk");
    if (token) {
        await sleep(3100);
        await fetch(`https://api-gateway.platoboost.com/v1/sessions/auth/2/${id}/${token}`, {
            method: "PUT"
        }).then(async (res) => {
            const data = await res.json();
            window.location.assign(data.redirect);
        }).catch(error => {
            alert("An Error Occurred During Authentication" + error);
        });
    } else {
        let response = await fetch(`https://api-gateway.platoboost.com/v1/sessions/auth/2/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        });

        if (response.status === 500) {
            return alert('Please solve the hCaptcha!');
        }
        response = await response.json();
        await sleep(1000);
        let decodeUrl = decodeURIComponent(response.redirect);
        let r = new URL(decodeUrl).searchParams.get("r");
        let c = atob(r);
        window.location.assign(c);
    }
}

let p = window.location.href;
if (p.includes("gateway.platoboost.com/a/8")) {
    delta();
} else if (p.includes("gateway.platoboost.com/a/2")) {
    deltaIOS();
}