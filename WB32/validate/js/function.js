$(function () {
    $('form').validate({
        rules: {
            firstname: {
                required: true
            },
            secondname: {
                required: true
            },

            mailaddres: {
                required: true,
                email: true

            },
            submailaddres: {
                required: true,
                email: true,
                equalTo: "#mailaddres"
            },
            pass: {
                required: true,
                rangelength: [8, 16]
            },
            subpass: {
                required: true,
                equalTo: "#pass"
            },
            zip: {
                required: true,
                CustomValidateZIP: true
            },
            pref: {
                required: true
            },
            city: {
                required: true
            },
            subcity: {
                required: true
            },
            "CheckboxGroup1": {
                required: true,
                minlength: 2
            },
            ple: {
                required: true,
                minlength: 3
            },
            sex: {
                required: true,
                minlength: 1

            },
            you: {
                required: true,
                Customyou: true
            },
            creditcard: {
                creditcard: true,
                required: true
            },
            ipv4: {
                required: true,
                ipv4: true
            },
            netmask: {
                required: true,
                netmask: true
            }

        },
        messages: {
            firstname: {
                required: "必須項目です",

            },
            secondname: {
                required: "必須項目です"
            },
            mailaddres: {
                required: "必須項目です",
                email: "メールの形式が正しくありません"

            },
            submailaddres: {
                required: "必須項目です",
                email: "メールの形式が正しくありません",
                equalTo: "メールアドレスが一致しません"
            },
            pass: {
                required: "必須項目です",
                rangelength: "８〜１６文字の間で入力して下さい"
            },
            subpass: {
                required: "必須項目です",
                equalTo: "パスワードが一致しません"
            },
            zip: {
                required: "必須項目です"
            },
            pref: {
                required: "必須項目です"
            },
            city: {
                required: "必須項目です"
            },
            subcity: {
                required: "必須項目です"
            },
            "CheckboxGroup1": {
                required: "必須項目です ",
                minlength: "２つ以上選択してください"
            },
            ple: {
                required: "必須項目です ",
                minlength: "3つ以上選択してください"
            },
            sex: {
                required: "必須項目です ",
                minlength: "どちらか選択をしてください"
            },
            you: {
                required: "必須項目です"
            }
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == "zip") {
                error.insertAfter("#zip_error");
            } else if (element.attr("name") == "CheckboxGroup1") {
                error.insertAfter("#CheckboxGroup1");
            } else if (element.attr("name") == "sex") {
                error.insertAfter("#sex");
            } else {
                error.insertAfter(element);
            }
        },

    });
    $('#addressbutton').click(() => {
        AjaxZip3.zip2addr('zip', '', 'pref', 'city', 'city2');
    });
    $.validator.addMethod("CustomValidateZIP", (val) => {
            reg = new RegExp("^[0-9]{3}\-[0-9]{4}$");
            return reg.test(val);
        },
        "郵便番号は半角英数字を使用し-で区切ってください"
    );

    $.validator.addMethod("Customyou", (val) => {
            reg = new RegExp("^o[m|h|i]s[0-9]{5}$");
            return reg.test(val);
        },
        "ohs,oms,oisいずれかを入力その後ろ5桁英数字で入力してください"
    );
});
//jQuery(function ($) {
//    jQuery("#multiSelectSample1").multiselect({
//        selectedList: 100,
//        checkAllText: "全選択",
//        uncheckAllText: "全選択解除",
//        noneSelectedText: "未選択です",
//        selectedText: "# 個選択"
//    });
//});
//close: function () {
//    var multiSelectSample1 = jQuery("#multiSelectSample1 option:selected");
//    for (i = 0, len = multiSelectSample1.length; i < len; i++) {
//        alert(multiSelectSample1[i].text);
//        alert(multiSelectSample1[i].value);
//    }
//}
