!(function ($) {
    var createdElements = [],
        defaults = {
            options: {
                prependExistingHelpBlock: !1,
                sniffHtml: !0,
                preventSubmit: !0,
                submitError: !1,
                submitSuccess: !1,
                semanticallyStrict: !1,
                autoAdd: { helpBlocks: !0 },
                filter: function () {
                    return !0;
                },
            },
            methods: {
                init: function (options) {
                    var settings = $.extend(!0, {}, defaults);
                    settings.options = $.extend(!0, settings.options, options);
                    var $siblingElements = this,
                        uniqueForms = $.unique(
                            this.map(function () {
                                return $(this).parents("form")[0];
                            }).toArray()
                        );
                    return (
                        $(uniqueForms).bind("submit", function (e) {
                            var $form = $(this),
                                warningsFound = 0,
                                $inputs = $form.find("input,textarea,select").not("[type=submit],[type=image]").filter(settings.options.filter);
                            $inputs.trigger("submit.validation").trigger("validationLostFocus.validation"),
                                $inputs.each(function (i, el) {
                                    var $this,
                                        $controlGroup = $(el).parents(".form-group, .checkbox").first();
                                    $controlGroup.hasClass("warning") && ($controlGroup.removeClass("warning").addClass("error"), warningsFound++);
                                }),
                                $inputs.trigger("validationLostFocus.validation"),
                                warningsFound
                                    ? (settings.options.preventSubmit && e.preventDefault(),
                                      $form.addClass("error"),
                                      $.isFunction(settings.options.submitError) && settings.options.submitError($form, e, $inputs.jqBootstrapValidation("collectErrors", !0)))
                                    : ($form.removeClass("error"), $.isFunction(settings.options.submitSuccess) && settings.options.submitSuccess($form, e));
                        }),
                        this.each(function () {
                            var $this = $(this),
                                $controlGroup = $this.parents(".form-group, .checkbox").first(),
                                $helpBlock = $controlGroup.find(".help-block").first(),
                                $form = $this.parents("form").first(),
                                validatorNames = [];
                            if (
                                (!$helpBlock.length &&
                                    settings.options.autoAdd &&
                                    settings.options.autoAdd.helpBlocks &&
                                    (($helpBlock = $('<div class="help-block" />')), $controlGroup.append($helpBlock), createdElements.push($helpBlock[0])),
                                settings.options.sniffHtml)
                            ) {
                                var message = "";
                                if (
                                    (void 0 !== $this.attr("pattern") &&
                                        ((message = "Not in the expected format\x3c!-- data-validation-pattern-message to override --\x3e"),
                                        $this.data("validationPatternMessage") && (message = $this.data("validationPatternMessage")),
                                        $this.data("validationPatternMessage", message),
                                        $this.data("validationPatternRegex", $this.attr("pattern"))),
                                    void 0 !== $this.attr("max") || void 0 !== $this.attr("aria-valuemax"))
                                ) {
                                    var max = void 0 !== $this.attr("max") ? $this.attr("max") : $this.attr("aria-valuemax");
                                    (message = "Too high: Maximum of '" + max + "'\x3c!-- data-validation-max-message to override --\x3e"),
                                        $this.data("validationMaxMessage") && (message = $this.data("validationMaxMessage")),
                                        $this.data("validationMaxMessage", message),
                                        $this.data("validationMaxMax", max);
                                }
                                if (void 0 !== $this.attr("min") || void 0 !== $this.attr("aria-valuemin")) {
                                    var min = void 0 !== $this.attr("min") ? $this.attr("min") : $this.attr("aria-valuemin");
                                    (message = "Too low: Minimum of '" + min + "'\x3c!-- data-validation-min-message to override --\x3e"),
                                        $this.data("validationMinMessage") && (message = $this.data("validationMinMessage")),
                                        $this.data("validationMinMessage", message),
                                        $this.data("validationMinMin", min);
                                }
                                void 0 !== $this.attr("maxlength") &&
                                    ((message = "Too long: Maximum of '" + $this.attr("maxlength") + "' characters\x3c!-- data-validation-maxlength-message to override --\x3e"),
                                    $this.data("validationMaxlengthMessage") && (message = $this.data("validationMaxlengthMessage")),
                                    $this.data("validationMaxlengthMessage", message),
                                    $this.data("validationMaxlengthMaxlength", $this.attr("maxlength"))),
                                    void 0 !== $this.attr("minlength") &&
                                        ((message = "Too short: Minimum of '" + $this.attr("minlength") + "' characters\x3c!-- data-validation-minlength-message to override --\x3e"),
                                        $this.data("validationMinlengthMessage") && (message = $this.data("validationMinlengthMessage")),
                                        $this.data("validationMinlengthMessage", message),
                                        $this.data("validationMinlengthMinlength", $this.attr("minlength"))),
                                    (void 0 === $this.attr("required") && void 0 === $this.attr("aria-required")) ||
                                        ((message = settings.builtInValidators.required.message),
                                        $this.data("validationRequiredMessage") && (message = $this.data("validationRequiredMessage")),
                                        $this.data("validationRequiredMessage", message)),
                                    void 0 !== $this.attr("type") &&
                                        "number" === $this.attr("type").toLowerCase() &&
                                        ((message = settings.builtInValidators.number.message), $this.data("validationNumberMessage") && (message = $this.data("validationNumberMessage")), $this.data("validationNumberMessage", message)),
                                    void 0 !== $this.attr("type") &&
                                        "email" === $this.attr("type").toLowerCase() &&
                                        ((message = "Not a valid email address\x3c!-- data-validator-validemail-message to override --\x3e"),
                                        $this.data("validationValidemailMessage") ? (message = $this.data("validationValidemailMessage")) : $this.data("validationEmailMessage") && (message = $this.data("validationEmailMessage")),
                                        $this.data("validationValidemailMessage", message)),
                                    void 0 !== $this.attr("minchecked") &&
                                        ((message = "Not enough options checked; Minimum of '" + $this.attr("minchecked") + "' required\x3c!-- data-validation-minchecked-message to override --\x3e"),
                                        $this.data("validationMincheckedMessage") && (message = $this.data("validationMincheckedMessage")),
                                        $this.data("validationMincheckedMessage", message),
                                        $this.data("validationMincheckedMinchecked", $this.attr("minchecked"))),
                                    void 0 !== $this.attr("maxchecked") &&
                                        ((message = "Too many options checked; Maximum of '" + $this.attr("maxchecked") + "' required\x3c!-- data-validation-maxchecked-message to override --\x3e"),
                                        $this.data("validationMaxcheckedMessage") && (message = $this.data("validationMaxcheckedMessage")),
                                        $this.data("validationMaxcheckedMessage", message),
                                        $this.data("validationMaxcheckedMaxchecked", $this.attr("maxchecked")));
                            }
                            void 0 !== $this.data("validation") && (validatorNames = $this.data("validation").split(",")),
                                $.each($this.data(), function (i, el) {
                                    var parts = i.replace(/([A-Z])/g, ",$1").split(",");
                                    "validation" === parts[0] && parts[1] && validatorNames.push(parts[1]);
                                });
                            var validatorNamesToInspect = validatorNames,
                                newValidatorNamesToInspect = [];
                            do {
                                $.each(validatorNames, function (i, el) {
                                    validatorNames[i] = formatValidatorName(el);
                                }),
                                    (validatorNames = $.unique(validatorNames)),
                                    (newValidatorNamesToInspect = []),
                                    $.each(validatorNamesToInspect, function (i, el) {
                                        if (void 0 !== $this.data("validation" + el + "Shortcut"))
                                            $.each($this.data("validation" + el + "Shortcut").split(","), function (i2, el2) {
                                                newValidatorNamesToInspect.push(el2);
                                            });
                                        else if (settings.builtInValidators[el.toLowerCase()]) {
                                            var validator = settings.builtInValidators[el.toLowerCase()];
                                            "shortcut" === validator.type.toLowerCase() &&
                                                $.each(validator.shortcut.split(","), function (i, el) {
                                                    (el = formatValidatorName(el)), newValidatorNamesToInspect.push(el), validatorNames.push(el);
                                                });
                                        }
                                    }),
                                    (validatorNamesToInspect = newValidatorNamesToInspect);
                            } while (validatorNamesToInspect.length > 0);
                            var validators = {};
                            $.each(validatorNames, function (i, el) {
                                var message = $this.data("validation" + el + "Message"),
                                    hasOverrideMessage = void 0 !== message,
                                    foundValidator = !1;
                                if (
                                    ((message = message || "'" + el + "' validation failed \x3c!-- Add attribute 'data-validation-" + el.toLowerCase() + "-message' to input to change this message --\x3e"),
                                    $.each(settings.validatorTypes, function (validatorType, validatorTemplate) {
                                        void 0 === validators[validatorType] && (validators[validatorType] = []),
                                            foundValidator ||
                                                void 0 === $this.data("validation" + el + formatValidatorName(validatorTemplate.name)) ||
                                                (validators[validatorType].push($.extend(!0, { name: formatValidatorName(validatorTemplate.name), message: message }, validatorTemplate.init($this, el))), (foundValidator = !0));
                                    }),
                                    !foundValidator && settings.builtInValidators[el.toLowerCase()])
                                ) {
                                    var validator = $.extend(!0, {}, settings.builtInValidators[el.toLowerCase()]);
                                    hasOverrideMessage && (validator.message = message);
                                    var validatorType = validator.type.toLowerCase();
                                    "shortcut" === validatorType
                                        ? (foundValidator = !0)
                                        : $.each(settings.validatorTypes, function (validatorTemplateType, validatorTemplate) {
                                              void 0 === validators[validatorTemplateType] && (validators[validatorTemplateType] = []),
                                                  foundValidator ||
                                                      validatorType !== validatorTemplateType.toLowerCase() ||
                                                      ($this.data("validation" + el + formatValidatorName(validatorTemplate.name), validator[validatorTemplate.name.toLowerCase()]),
                                                      validators[validatorType].push($.extend(validator, validatorTemplate.init($this, el))),
                                                      (foundValidator = !0));
                                          });
                                }
                                foundValidator || $.error("Cannot find validation info for '" + el + "'");
                            }),
                                $helpBlock.data("original-contents", $helpBlock.data("original-contents") ? $helpBlock.data("original-contents") : $helpBlock.html()),
                                $helpBlock.data("original-role", $helpBlock.data("original-role") ? $helpBlock.data("original-role") : $helpBlock.attr("role")),
                                $controlGroup.data("original-classes", $controlGroup.data("original-clases") ? $controlGroup.data("original-classes") : $controlGroup.attr("class")),
                                $this.data("original-aria-invalid", $this.data("original-aria-invalid") ? $this.data("original-aria-invalid") : $this.attr("aria-invalid")),
                                $this.bind("validation.validation", function (event, params) {
                                    var value = getValue($this),
                                        errorsFound = [];
                                    return (
                                        $.each(validators, function (validatorType, validatorTypeArray) {
                                            (value || value.length || (params && params.includeEmpty) || (settings.validatorTypes[validatorType].blockSubmit && params && params.submitting)) &&
                                                $.each(validatorTypeArray, function (i, validator) {
                                                    settings.validatorTypes[validatorType].validate($this, value, validator) && errorsFound.push(validator.message);
                                                });
                                        }),
                                        errorsFound
                                    );
                                }),
                                $this.bind("getValidators.validation", function () {
                                    return validators;
                                }),
                                $this.bind("submit.validation", function () {
                                    return $this.triggerHandler("change.validation", { submitting: !0 });
                                }),
                                $this.bind(["keyup", "focus", "blur", "click", "keydown", "keypress", "change"].join(".validation ") + ".validation", function (e, params) {
                                    var value = getValue($this),
                                        errorsFound = [];
                                    $controlGroup.find("input,textarea,select").each(function (i, el) {
                                        var oldCount = errorsFound.length;
                                        if (
                                            ($.each($(el).triggerHandler("validation.validation", params), function (j, message) {
                                                errorsFound.push(message);
                                            }),
                                            errorsFound.length > oldCount)
                                        )
                                            $(el).attr("aria-invalid", "true");
                                        else {
                                            var original = $this.data("original-aria-invalid");
                                            $(el).attr("aria-invalid", void 0 !== original && original);
                                        }
                                    }),
                                        $form
                                            .find("input,select,textarea")
                                            .not($this)
                                            .not('[name="' + $this.attr("name") + '"]')
                                            .trigger("validationLostFocus.validation"),
                                        (errorsFound = $.unique(errorsFound.sort())).length
                                            ? ($controlGroup.removeClass("success error").addClass("warning"),
                                              settings.options.semanticallyStrict && 1 === errorsFound.length
                                                  ? $helpBlock.html(errorsFound[0] + (settings.options.prependExistingHelpBlock ? $helpBlock.data("original-contents") : ""))
                                                  : $helpBlock.html(
                                                        '<ul class="list-unstyled alert alert-warning" role="alert"><li>' +
                                                            errorsFound.join("</li><li>") +
                                                            "</li></ul>" +
                                                            (settings.options.prependExistingHelpBlock ? $helpBlock.data("original-contents") : "")
                                                    ))
                                            : ($controlGroup.removeClass("warning error success"), value.length > 0 && $controlGroup.addClass("success"), $helpBlock.html($helpBlock.data("original-contents"))),
                                        "blur" === e.type && $controlGroup.removeClass("success");
                                }),
                                $this.bind("validationLostFocus.validation", function () {
                                    $controlGroup.removeClass("success");
                                });
                        })
                    );
                },
                destroy: function () {
                    return this.each(function () {
                        var $this = $(this),
                            $controlGroup = $this.parents(".form-group, .checkbox").first(),
                            $helpBlock = $controlGroup.find(".help-block").first();
                        $this.unbind(".validation"),
                            $helpBlock.html($helpBlock.data("original-contents")),
                            $controlGroup.attr("class", $controlGroup.data("original-classes")),
                            $this.attr("aria-invalid", $this.data("original-aria-invalid")),
                            $helpBlock.attr("role", $this.data("original-role")),
                            createdElements.indexOf($helpBlock[0]) > -1 && $helpBlock.remove();
                    });
                },
                collectErrors: function (includeEmpty) {
                    var errorMessages = {};
                    return (
                        this.each(function (i, el) {
                            var $el = $(el),
                                name = $el.attr("name"),
                                errors = $el.triggerHandler("validation.validation", { includeEmpty: !0 });
                            errorMessages[name] = $.extend(!0, errors, errorMessages[name]);
                        }),
                        $.each(errorMessages, function (i, el) {
                            0 === el.length && delete errorMessages[i];
                        }),
                        errorMessages
                    );
                },
                hasErrors: function () {
                    var errorMessages = [];
                    return (
                        this.each(function (i, el) {
                            errorMessages = errorMessages.concat($(el).triggerHandler("getValidators.validation") ? $(el).triggerHandler("validation.validation", { submitting: !0 }) : []);
                        }),
                        errorMessages.length > 0
                    );
                },
                override: function (newDefaults) {
                    defaults = $.extend(!0, defaults, newDefaults);
                },
            },
            validatorTypes: {
                callback: {
                    name: "callback",
                    init: function ($this, name) {
                        return { validatorName: name, callback: $this.data("validation" + name + "Callback"), lastValue: $this.val(), lastValid: !0, lastFinished: !0 };
                    },
                    validate: function ($this, value, validator) {
                        if (validator.lastValue === value && validator.lastFinished) return !validator.lastValid;
                        if (!0 === validator.lastFinished) {
                            (validator.lastValue = value), (validator.lastValid = !0), (validator.lastFinished = !1);
                            var rrjqbvValidator = validator,
                                rrjqbvThis = $this;
                            executeFunctionByName(validator.callback, window, $this, value, function (data) {
                                rrjqbvValidator.lastValue === data.value &&
                                    ((rrjqbvValidator.lastValid = data.valid),
                                    data.message && (rrjqbvValidator.message = data.message),
                                    (rrjqbvValidator.lastFinished = !0),
                                    rrjqbvThis.data("validation" + rrjqbvValidator.validatorName + "Message", rrjqbvValidator.message),
                                    setTimeout(function () {
                                        rrjqbvThis.trigger("change.validation");
                                    }, 1));
                            });
                        }
                        return !1;
                    },
                },
                ajax: {
                    name: "ajax",
                    init: function ($this, name) {
                        return { validatorName: name, url: $this.data("validation" + name + "Ajax"), lastValue: $this.val(), lastValid: !0, lastFinished: !0 };
                    },
                    validate: function ($this, value, validator) {
                        return "" + validator.lastValue == "" + value && !0 === validator.lastFinished
                            ? !1 === validator.lastValid
                            : (!0 === validator.lastFinished &&
                                  ((validator.lastValue = value),
                                  (validator.lastValid = !0),
                                  (validator.lastFinished = !1),
                                  $.ajax({
                                      url: validator.url,
                                      data: "value=" + value + "&field=" + $this.attr("name"),
                                      dataType: "json",
                                      success: function (data) {
                                          "" + validator.lastValue == "" + data.value &&
                                              ((validator.lastValid = !!data.valid),
                                              data.message && (validator.message = data.message),
                                              (validator.lastFinished = !0),
                                              $this.data("validation" + validator.validatorName + "Message", validator.message),
                                              setTimeout(function () {
                                                  $this.trigger("change.validation");
                                              }, 1));
                                      },
                                      failure: function () {
                                          (validator.lastValid = !0),
                                              (validator.message = "ajax call failed"),
                                              (validator.lastFinished = !0),
                                              $this.data("validation" + validator.validatorName + "Message", validator.message),
                                              setTimeout(function () {
                                                  $this.trigger("change.validation");
                                              }, 1);
                                      },
                                  })),
                              !1);
                    },
                },
                regex: {
                    name: "regex",
                    init: function ($this, name) {
                        return { regex: regexFromString($this.data("validation" + name + "Regex")) };
                    },
                    validate: function ($this, value, validator) {
                        return (!validator.regex.test(value) && !validator.negative) || (validator.regex.test(value) && validator.negative);
                    },
                },
                required: {
                    name: "required",
                    init: function ($this, name) {
                        return {};
                    },
                    validate: function ($this, value, validator) {
                        return !(0 !== value.length || validator.negative) || !!(value.length > 0 && validator.negative);
                    },
                    blockSubmit: !0,
                },
                match: {
                    name: "match",
                    init: function ($this, name) {
                        var element = $this
                            .parents("form")
                            .first()
                            .find('[name="' + $this.data("validation" + name + "Match") + '"]')
                            .first();
                        return (
                            element.bind("validation.validation", function () {
                                $this.trigger("change.validation", { submitting: !0 });
                            }),
                            { element: element }
                        );
                    },
                    validate: function ($this, value, validator) {
                        return (value !== validator.element.val() && !validator.negative) || (value === validator.element.val() && validator.negative);
                    },
                    blockSubmit: !0,
                },
                max: {
                    name: "max",
                    init: function ($this, name) {
                        return { max: $this.data("validation" + name + "Max") };
                    },
                    validate: function ($this, value, validator) {
                        return (parseFloat(value, 10) > parseFloat(validator.max, 10) && !validator.negative) || (parseFloat(value, 10) <= parseFloat(validator.max, 10) && validator.negative);
                    },
                },
                min: {
                    name: "min",
                    init: function ($this, name) {
                        return { min: $this.data("validation" + name + "Min") };
                    },
                    validate: function ($this, value, validator) {
                        return (parseFloat(value) < parseFloat(validator.min) && !validator.negative) || (parseFloat(value) >= parseFloat(validator.min) && validator.negative);
                    },
                },
                maxlength: {
                    name: "maxlength",
                    init: function ($this, name) {
                        return { maxlength: $this.data("validation" + name + "Maxlength") };
                    },
                    validate: function ($this, value, validator) {
                        return (value.length > validator.maxlength && !validator.negative) || (value.length <= validator.maxlength && validator.negative);
                    },
                },
                minlength: {
                    name: "minlength",
                    init: function ($this, name) {
                        return { minlength: $this.data("validation" + name + "Minlength") };
                    },
                    validate: function ($this, value, validator) {
                        return (value.length < validator.minlength && !validator.negative) || (value.length >= validator.minlength && validator.negative);
                    },
                },
                maxchecked: {
                    name: "maxchecked",
                    init: function ($this, name) {
                        var elements = $this
                            .parents("form")
                            .first()
                            .find('[name="' + $this.attr("name") + '"]');
                        return (
                            elements.bind("click.validation", function () {
                                $this.trigger("change.validation", { includeEmpty: !0 });
                            }),
                            { maxchecked: $this.data("validation" + name + "Maxchecked"), elements: elements }
                        );
                    },
                    validate: function ($this, value, validator) {
                        return (validator.elements.filter(":checked").length > validator.maxchecked && !validator.negative) || (validator.elements.filter(":checked").length <= validator.maxchecked && validator.negative);
                    },
                    blockSubmit: !0,
                },
                minchecked: {
                    name: "minchecked",
                    init: function ($this, name) {
                        var elements = $this
                            .parents("form")
                            .first()
                            .find('[name="' + $this.attr("name") + '"]');
                        return (
                            elements.bind("click.validation", function () {
                                $this.trigger("change.validation", { includeEmpty: !0 });
                            }),
                            { minchecked: $this.data("validation" + name + "Minchecked"), elements: elements }
                        );
                    },
                    validate: function ($this, value, validator) {
                        return (validator.elements.filter(":checked").length < validator.minchecked && !validator.negative) || (validator.elements.filter(":checked").length >= validator.minchecked && validator.negative);
                    },
                    blockSubmit: !0,
                },
            },
            builtInValidators: {
                email: { name: "Email", type: "shortcut", shortcut: "validemail" },
                validemail: { name: "Validemail", type: "regex", regex: "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,10}", message: "Not a valid email address\x3c!-- data-validator-validemail-message to override --\x3e" },
                passwordagain: { name: "Passwordagain", type: "match", match: "password", message: "Does not match the given password\x3c!-- data-validator-paswordagain-message to override --\x3e" },
                positive: { name: "Positive", type: "shortcut", shortcut: "number,positivenumber" },
                negative: { name: "Negative", type: "shortcut", shortcut: "number,negativenumber" },
                number: { name: "Number", type: "regex", regex: "([+-]?\\d+(\\.\\d*)?([eE][+-]?[0-9]+)?)?", message: "Must be a number\x3c!-- data-validator-number-message to override --\x3e" },
                integer: { name: "Integer", type: "regex", regex: "[+-]?\\d+", message: "No decimal places allowed\x3c!-- data-validator-integer-message to override --\x3e" },
                positivenumber: { name: "Positivenumber", type: "min", min: 0, message: "Must be a positive number\x3c!-- data-validator-positivenumber-message to override --\x3e" },
                negativenumber: { name: "Negativenumber", type: "max", max: 0, message: "Must be a negative number\x3c!-- data-validator-negativenumber-message to override --\x3e" },
                required: { name: "Required", type: "required", message: "This is required\x3c!-- data-validator-required-message to override --\x3e" },
                checkone: { name: "Checkone", type: "minchecked", minchecked: 1, message: "Check at least one option\x3c!-- data-validation-checkone-message to override --\x3e" },
            },
        },
        formatValidatorName = function (name) {
            return name.toLowerCase().replace(/(^|\s)([a-z])/g, function (m, p1, p2) {
                return p1 + p2.toUpperCase();
            });
        },
        getValue = function ($this) {
            var value = $this.val(),
                type = $this.attr("type");
            return "checkbox" === type && (value = $this.is(":checked") ? value : ""), "radio" === type && (value = $('input[name="' + $this.attr("name") + '"]:checked').length > 0 ? value : ""), value;
        };
    function regexFromString(inputstring) {
        return new RegExp("^" + inputstring + "$");
    }
    function executeFunctionByName(functionName, context) {
        for (var args = Array.prototype.slice.call(arguments).splice(2), namespaces = functionName.split("."), func = namespaces.pop(), i = 0; i < namespaces.length; i++) context = context[namespaces[i]];
        return context[func].apply(this, args);
    }
    ($.fn.jqBootstrapValidation = function (method) {
        return defaults.methods[method]
            ? defaults.methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
            : "object" != typeof method && method
            ? ($.error("Method " + method + " does not exist on jQuery.jqBootstrapValidation"), null)
            : defaults.methods.init.apply(this, arguments);
    }),
        ($.jqBootstrapValidation = function (options) {
            $(":input").not("[type=image],[type=submit]").jqBootstrapValidation.apply(this, arguments);
        });
})(jQuery);
