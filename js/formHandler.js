$(function () {
    function getProcessorPath(form) {
        var path = "./includes/" + form.attr("id") + ".php";
        return form.attr("template-path") && (path = form.attr("template-path") + "/includes/" + form.attr("id") + ".php"), path;
    }
    $("input,textarea").jqBootstrapValidation({
        preventSubmit: !0,
        submitSuccess: function ($form, event) {
            if (!$form.attr("action")) {
                event.preventDefault();
                var processorFile = getProcessorPath($form),
                    formData = {};
                $form.find("input, textarea, option:selected").each(function (e) {
                    var fieldData = $(this).val(),
                        fieldID = $(this).attr("id");
                    $(this).is(":checkbox")
                        ? (fieldData = $(this).is(":checked"))
                        : $(this).is(":radio")
                        ? (fieldData = $(this).val() + " = " + $(this).is(":checked"))
                        : $(this).is("option:selected") && (fieldID = $(this).parent().attr("id")),
                        (formData[fieldID] = fieldData);
                }),
                    $.ajax({
                        url: processorFile,
                        type: "POST",
                        data: formData,
                        cache: !1,
                        success: function () {
                            $form.is("[success-msg]")
                                ? $form.append(
                                      "<div id='form-alert'><div class='alert alert-success'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>" +
                                          $form.attr("success-msg") +
                                          "</strong></div></div>"
                                  )
                                : window.location.replace($form.attr("success-url")),
                                $form.trigger("reset");
                        },
                        error: function () {
                            0 == $("#form-alert").length &&
                                $form.append(
                                    "<div id='form-alert'><div class='alert alert-danger'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>" +
                                        $form.attr("fail-msg") +
                                        "</strong></div></div>"
                                );
                        },
                    });
            }
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });
});
