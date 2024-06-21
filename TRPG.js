const userstatus = ['筋力', '頭脳', '俊敏', '隠秘', '直感', '精神']
function buturi(property, status, enemystatus){
    let damage = property.damage;
    for(let a = 0; a < property.for; a++){
        const roll = Number(prompt(`ロール結果${a + 1}`));
        if(enemystatus[4].value - status[4].value < roll){
            damage += (roll + Number(status[0].value)) * property.multiple;
        }
    }
    return damage
}
function mahou(property, status, enemystatus){
    let damage = 0;
    for(let a = 0; a < property.for; a++){
        if(Number(prompt(`ロール結果${a + 1}`)) <= property.rate + Math.floor(status[1].value * 0.5)){
            damage += property.damage + Math.floor(status[1].value * 0.375 * property.damage);
        }
    }
    return damage
}
const attack = [{name: 'ストライク', type: buturi, property: {damage: 50, for: 1, multiple: 5}}, {name: 'スマッシュ', type: buturi, property: {damage: 40, for: 1, multiple: 10}}, {name: 'ダブルアタック', type: buturi, property: {damage: 25, for: 2, multiple: 5}}, {name: 'アイアンナックル', type: buturi, property: {damage: 60, for: 1, multiple: 15}}, {name: '魔弾', type: mahou, property: {damage: 40, for: 1, rate: 3}}, {name: '強魔弾', type: mahou, property: {damage: 60, for: 1, rate: 2}}, {name: '波動', type: mahou, property: {damage: 30, for: 1, rate: 3}}, {name: '魔針銃', type: mahou, property: {damage: 20, for: 3, rate: 3}}];
usercount = 0;
let userinput = [];
let username = [];
function adduser(){
    const inputusername = prompt('名前');
    const userdiv = document.createElement('div');
    userdiv.class = 'user';
    userdiv.style = `display: inline-block;_display: inline;background-color: hsl(${usercount * 36} 100% 75%);`;
    username[usercount] = inputusername
    const usernamedisplay = document.createElement('h2');
    usernamedisplay.textContent = username[usercount];
    userdiv.appendChild(usernamedisplay);
    userinput[usercount] = [];
    for(let a = 0; a < userstatus.length; a++){
        const userstatusdisplay = document.createElement('span');
        userstatusdisplay.textContent = userstatus[a];
        userinput[usercount][a] = document.createElement('input');
        userinput[usercount][a].type = 'range';
        userinput[usercount][a].min = '1';
        userinput[usercount][a].max = '6';
        userinput[usercount][a].step = '1';
        userinput[usercount][a].value = '1';

        const valuedisplay = document.createElement('span');
        valuedisplay.textContent = userinput[usercount][a].value;

        userinput[usercount][a].addEventListener('input', function(e){
            valuedisplay.textContent = e.target.value;
        });

        userdiv.appendChild(userstatusdisplay);
        userdiv.appendChild(userinput[usercount][a]);
        userdiv.appendChild(valuedisplay);
        userdiv.appendChild(document.createElement('br'));
    }
    const attackselect = document.createElement('select');
    for(let a = 0; a < attack.length; a++){
        const attackoption = document.createElement('option');
        attackoption.value = a;
        attackoption.textContent = attack[a].name;
        attackselect.appendChild(attackoption);
    }
    userdiv.appendChild(attackselect);
    const userselect = document.createElement('select');
    userselect.class = 'userselect';
    const allattackoption = document.createElement('option');
    allattackoption.value = 'all';
    allattackoption.textContent = '全体攻撃';
    userselect.appendChild(allattackoption);
    for(let a = 0; a < username.length - 1; a++){
        const useroption = document.createElement('option');
        useroption.value = username[a];
        useroption.textContent = username[a];
        userselect.appendChild(useroption);
    }
    userdiv.appendChild(userselect);
    const battle = document.createElement('button');
    battle.textContent = '戦闘';
    battle.addEventListener('click', function(){
        const userindex = username.indexOf(inputusername);
        const userattack = attack[attackselect.value];
        if(userselect.value === 'all'){
            for(let a = 0; a < username.length; a++){
                if(a !== userindex){
                    alert(`${username[a]}に${userattack.type(userattack.property, userinput[userindex], userinput[a])}ダメージ`);
                }
            }
        }else{
            alert(`${userselect.value}に${userattack.type(userattack.property, userinput[userindex], userinput[username.indexOf(userselect.value)])}ダメージ`);
        }
    });
    userdiv.appendChild(battle);
    document.getElementsByClassName('users')[0].appendChild(userdiv);
    usercount++;
    document.getElementsByClassName('adduser')[0].addEventListener('click', function(){
        const useroption = document.createElement('option');
        useroption.value = username[username.length - 1];
        useroption.textContent = username[username.length - 1];
        userselect.appendChild(useroption);
    });
}
document.getElementsByClassName('adduser')[0].addEventListener('click', function(){
    adduser();
});
//全体攻撃は敵ごとにロールするか