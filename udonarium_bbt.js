javascript:void((function(f){
    var jsZip = new Promise(function(resolve, reject) {
      var script = document.createElement('script');
      script.src = '//cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js';
      script.onload = function() { resolve(); };
      script.onerror = function() { reject(); };
      document.body.appendChild(script);
    });

    var fileSv = new Promise(function(resolve, reject) {
      var script = document.createElement('script');
      script.src = '//cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.min.js';
      script.onload = function() { resolve(); };
      script.onerror = function() { reject(); };
      document.body.appendChild(script);
    });

    Promise.all([jsZip, fileSv])
      .then(function(libs) {
        f.apply(window, libs);
      })
      .catch(function(err) {
        console.error(err);
      });
  })(function(undefined){

    /* 実処理部分 */
    var source = window.document;
    var sourceURL = window.document.location;
    var validPattern = /^http(s)?:\/\/character-sheets\.appspot\.com\/bbt\//;
    if(validPattern.test(sourceURL) == false) {
        return;
    }

    function getByName(obj, name) {
        var elem = obj.getElementsByName(name)[0];
        if(elem != null) {
            return  elem.value;
        } else {
            return '';
        }
    };

    function getById(obj,id){
        var elem = obj.getElementById(id);
        if(elem!==null){
            return elem.value;
        } else {
            return '';
        }
    };

    alert('キャラコマデータを出力します');

    /* xmlの生成 */
    /* 一番外側 */
    xml = document.createElement('character');
    xml.setAttribute('location.x', '0');
    xml.setAttribute('location.y', '0');
    xml.setAttribute('posZ', '0');
    xml.setAttribute('rotate', '0');
    xml.setAttribute('roll', '0');

    /* data部分 */
    char = document.createElement('data');
    char.setAttribute('name', 'character');

    /* 空のイメージタグを入れておく */
    img = document.createElement('data');
    img.setAttribute('name', 'image');
    elem = document.createElement('data');
    elem.setAttribute('type', 'image');
    elem.setAttribute('name', 'imageIdentifier');
    elem.innerText = 'null';
    img.appendChild(elem);
    char.appendChild(img);

    /* 名前とかの共通部分 */
    common = document.createElement('data');
    common.setAttribute('name', 'common');
    elem = document.createElement('data');
    elem.setAttribute('name', 'name');
    elem.innerText = getByName(source, 'name');
    var char_name = getByName(source, 'name');
    common.appendChild(elem);
    elem = document.createElement('data');
    elem.setAttribute('name', 'size');
    elem.innerText = '1';
    common.appendChild(elem);
    char.appendChild(common);

    /*　データ部分 */
    detail = document.createElement('data');
    detail.setAttribute('name', 'detail');

    /* リソース */
    resource = document.createElement('data');
    resource.setAttribute('name', 'リソース');
    /* FP */
    elem = document.createElement('data');
    elem.setAttribute('name', 'FP');
    elem.setAttribute('type', 'numberResource');
    elem.setAttribute('currentValue', getById(source, 'fp.total'));
    elem.innerText = getById(source, 'fp.total');
    resource.appendChild(elem);

    /* 人間性 */
    elem = document.createElement('data');
    elem.setAttribute('name', '人間性');
    elem.setAttribute('type', 'numberResource');
    elem.setAttribute('currentValue', getById(source, 'humanity.total'));
    elem.innerText = getById(source, 'humanity.total');
    resource.appendChild(elem);

    /* 愛 */
    elem = document.createElement('data');
    elem.setAttribute('name', '愛');
    elem.setAttribute('type', 'numberResource');
    elem.setAttribute('currentValue', '0');
    elem.innerText = 7;
    resource.appendChild(elem);

    /* 罪 */
    elem = document.createElement('data');
    elem.setAttribute('name', '罪');
    elem.setAttribute('type', 'numberResource');
    elem.setAttribute('currentValue', '0');
    elem.innerText = 7;
    resource.appendChild(elem);

    /* 情報 */
    info = document.createElement('data');
    info.setAttribute('name', '情報');

    /* 説明 */
    elem = document.createElement('data');
    elem.setAttribute('name', '説明');
    elem.setAttribute('type', 'note');
    elem.innerText = getById(source, 'base.memo');
    info.appendChild(elem);

    /* キャラシURL */
    elem = document.createElement('data');
    elem.setAttribute('name', 'メモ');
    elem.setAttribute('type', 'note');
    elem.innerText = sourceURL;
    info.appendChild(elem);

    /* 基本データ */
    baseData = document.createElement('data');
    baseData.setAttribute('name', '基本データ');

    /* スタイル */
    elem = document.createElement('data');
    elem.setAttribute('name', 'スタイル');
    elem.innerText = getById(source, 'base.style');
    baseData.appendChild(elem);

    /* プライマリブラッド */
    elem = document.createElement('data');
    elem.setAttribute('name', 'ブラッド[P]');
    elem.innerText = getById(source, 'base.bloods.primary.blood');
    baseData.appendChild(elem);

    /* セカンダリブラッド */
    elem = document.createElement('data');
    elem.setAttribute('name', 'ブラッド[S]');
    elem.innerText = getById(source, 'base.bloods.secondary.blood');
    baseData.appendChild(elem);

    /* 基本能力値 */
    baseAbility = document.createElement('data');
    baseAbility.setAttribute('name', '基本能力値');

    /* 肉体 */
    elem = document.createElement('data');
    elem.setAttribute('name', '肉体');
    elem.innerText = getById(source, 'baseAbility.body.total');
    baseAbility.appendChild(elem);

    /* 技術 */
    elem = document.createElement('data');
    elem.setAttribute('name', '技術');
    elem.innerText = getById(source, 'baseAbility.skill.total');
    baseAbility.appendChild(elem);

    /* 感情 */
    elem = document.createElement('data');
    elem.setAttribute('name', '感情');
    elem.innerText = getById(source, 'baseAbility.emotion.total');
    baseAbility.appendChild(elem);

    /* 加護 */
    elem = document.createElement('data');
    elem.setAttribute('name', '加護');
    elem.innerText = getById(source, 'baseAbility.divine.total');
    baseAbility.appendChild(elem);

    /* 社会 */
    elem = document.createElement('data');
    elem.setAttribute('name', '社会');
    elem.innerText = getById(source, 'baseAbility.society.total');
    baseAbility.appendChild(elem);

    /* ボーナス能力値 */
    bonusAbility = document.createElement('data');
    bonusAbility.setAttribute('name', '能力ボーナス');

    /* 肉体B */
    elem = document.createElement('data');
    elem.setAttribute('name', '肉体B');
    elem.innerText = getById(source, 'baseAbility.body.tbonus');
    bonusAbility.appendChild(elem);

    /* 技術B */
    elem = document.createElement('data');
    elem.setAttribute('name', '技術B');
    elem.innerText = getById(source, 'baseAbility.skill.tbonus');
    bonusAbility.appendChild(elem);

    /* 感情B */
    elem = document.createElement('data');
    elem.setAttribute('name', '感情B');
    elem.innerText = getById(source, 'baseAbility.emotion.tbonus');
    bonusAbility.appendChild(elem);

    /* 加護B */
    elem = document.createElement('data');
    elem.setAttribute('name', '加護B');
    elem.innerText = getById(source, 'baseAbility.divine.tbonus');
    bonusAbility.appendChild(elem);

    /* 社会B */
    elem = document.createElement('data');
    elem.setAttribute('name', '社会B');
    elem.innerText = getById(source, 'baseAbility.society.tbonus');
    bonusAbility.appendChild(elem);

    /* 戦闘能力値 */
    battleAbility = document.createElement('data');
    battleAbility.setAttribute('name', '戦闘能力値');

    /* 白兵 */
    elem = document.createElement('data');
    elem.setAttribute('name', '白兵');
    elem.innerText = getById(source, 'battleAbility.combat.total');
    battleAbility.appendChild(elem);

    /* 射撃 */
    elem = document.createElement('data');
    elem.setAttribute('name', '射撃');
    elem.innerText = getById(source, 'battleAbility.shoot.total');
    battleAbility.appendChild(elem);

    /* 回避 */
    elem = document.createElement('data');
    elem.setAttribute('name', '回避');
    elem.innerText = getById(source, 'battleAbility.dodge.total');
    battleAbility.appendChild(elem);

    /* 行動 */
    elem = document.createElement('data');
    elem.setAttribute('name', '行動');
    elem.innerText = getById(source, 'battleAbility.action.total');
    battleAbility.appendChild(elem);

    /* アーツ */
    arts = document.createElement('data');
    arts.setAttribute('name', 'アーツ');
    var artsList = window.document.getElementById('arts').children[1].children;
    for(var i=0; i<artsList.length; i++){
        /* アーツ名の欄が空だったらスキップ */
        if(artsList[i].children[0].textContent == '')continue;
        elem = document.createElement('data');
        elem.setAttribute('name', 'Lv'+artsList[i].children[2].textContent);
        elem.innerText = artsList[i].children[0].textContent;
        arts.appendChild(elem);
    }

    /* アイテム */
    item = document.createElement('data');
    item.setAttribute('name', 'アイテム');

    /* 武器 */
    var weaponList = window.document.getElementById('weapons').children[1].children;
    for(var i=0; i<weaponList.length; i++){
        /* 名前欄が空だったらスキップ */
        if(weaponList[i].children[0].textContent == '')continue;
        elem = document.createElement('data');
        elem.setAttribute('name', '武器');
        elem.innerText = weaponList[i].children[0].textContent;
        item.appendChild(elem);
    }

    /* 防具 */
    var armourList = window.document.getElementById('armours').children[1].children;
    for(var i=0; i<armourList.length; i++){
        /* 名前欄が空だったらスキップ */
        if(armourList[i].children[0].textContent == '')continue;
        elem = document.createElement('data');
        elem.setAttribute('name', '防具');
        elem.innerText = armourList[i].children[0].textContent;
        item.appendChild(elem);
    }

    /* 一般アイテム */
    var itemList = window.document.getElementById('items').children[1].children;
    for(var i=0; i<itemList.length; i++){
        /* 名前欄が空だったらスキップ */
        if(itemList[i].children[0].textContent == '')continue;
        elem = document.createElement('data');
        elem.setAttribute('name', '一般');
        elem.innerText = itemList[i].children[0].textContent;
        item.appendChild(elem);
    }

    /* 絆エゴ */
    binds = document.createElement('data');
    binds.setAttribute('name', '絆/エゴ');

    kizuna = document.createElement('data');
    kizuna.setAttribute('name', '絆');
    ego = document.createElement('data');
    ego.setAttribute('name', 'エゴ');

    var bindList = window.document.getElementById('binds').children[1].children;
    for(var i=0; i<bindList.length; i++){
        /* 絆エゴ判定 */
        if(bindList[i].children[0].children[0].value == '')continue;
        if(bindList[i].children[0].children[0].value == '絆'){
            elem = document.createElement('data');
            elem.setAttribute('name', bindList[i].children[2].children[0].value);
            elem.innerText = bindList[i].children[1].children[0].value;
            kizuna.appendChild(elem);
        }else if(bindList[i].children[0].children[0].value == 'エゴ'){
            elem = document.createElement('data');
            elem.setAttribute('name', '');
            elem.innerText = bindList[i].children[1].children[0].value;
            ego.appendChild(elem);
        }else{
            continue;
        }
    }
    binds.appendChild(kizuna);
    binds.appendChild(ego);

    /* detailの子要素の設定 */
    detail.appendChild(resource);
    detail.appendChild(info);
    detail.appendChild(baseData);
    detail.appendChild(baseAbility);
    detail.appendChild(bonusAbility);
    detail.appendChild(battleAbility);
    detail.appendChild(arts);
    detail.appendChild(item);
    detail.appendChild(binds);

    /* チャパレ */
    chatPalette = document.createElement('chat-palette');
    chatPalette.setAttribute('dicebot', 'Arianrhod');

    /* チャパレ内容 */
    cp = '';
    cp += '1D6 [人間性減少]\n';
    cp += 'EMO [邂逅表]\n';
    cp += '\n';
    cp += '//判定\n';
    cp += '2BB+{肉体}%{人間性} 判定[肉体]\n';
    cp += '2BB+{技術}%{人間性} 判定[技術]\n';
    cp += '2BB+{感情}%{人間性} 判定[感情]\n';
    cp += '2BB+{加護}%{人間性} 判定[加護]\n';
    cp += '2BB+{社会}%{人間性} 判定[社会]\n';
    cp += '\n';
    cp += '//戦闘判定\n';
    cp += '2BB+{白兵}%{人間性} 判定[白兵]\n';
    cp += '2BB+{射撃}%{人間性} 判定[射撃]\n';
    cp += '2BB+{回避}%{人間性} 判定[回避]\n';
    cp += '2BB+{行動}%{人間性} 判定[行動]\n';
    cp += '\n';
    cp += '//汎用計算式：ダメージ値とアーマー値を書き換えて使う\n';
    cp += 'C([ダメージ値]-[アーマー値]) [ダメージ計算]\n';
    cp += '\n';
    cp += '//武器メモ欄\n';
    cp += '\n';
    cp += '//アーツメモ欄\n';
    /* アーツコピペ */
    for(var i=0; i<artsList.length; i++){
        /* アーツ名の欄が空だったらスキップ */
        if(artsList[i].children[0].textContent == '')continue;
        artsText = '['+artsList[i].children[0].textContent+'] ';
        artsText += '('+artsList[i].children[3].textContent+'/'+artsList[i].children[4].textContent+'/'+artsList[i].children[5].textContent+'/'+artsList[i].children[6].textContent+'/コスト:'+artsList[i].children[7].textContent+') ';
        artsText += artsList[i].children[8].textContent+'\n';
        cp += artsText;
    }

    cp += '\n';
    chatPalette.innerText = cp;

    /* detailの登録 */
    char.appendChild(detail);

    /* 全部登録 */
    xml.appendChild(char);
    xml.appendChild(chatPalette);

    /* zip化処理 */
    s = new XMLSerializer();
    out = s.serializeToString(xml);
    out = out.replace(/xmlns=.http:\/\/www\.w3\.org\/1999\/xhtml../, '');
    out = out.replace(/<br \/>/g, '\n');
    out = out.replace(/currentvalue/g, 'currentValue');
    zip = new JSZip();
    zip.file(`${char_name}.xml`, out);
    zip.generateAsync({type:'blob'}).then(function(blob){
        saveAs(blob, `${char_name}.zip`);
    });
}));
