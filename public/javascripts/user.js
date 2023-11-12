$(document).ready(function () {
    $("#register-form").submit(function (e) {
        e.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/api/user/register",
            data: formData,
            success: function (response) {
                console.log("Registration successful:", response.message);
                window.location.href = "/success-page.html";
            },
            error: function (error) {
                console.error("Registration error:", error.responseJSON.message);
            }
        });
    });


    $("#login-form").submit(function (e) {
        e.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/api/user/login",
            data: formData,
            success: function (response) {
                console.log("Login successful");

                localStorage.setItem("token", response.token);

                window.location.href = "/dashboard.html";
            },
            error: function (error) {
                console.error("Login error:", error.responseJSON.message);
            }
        });
    });

    $("#logout-btn").click(function () {
        $.ajax({
            type: "POST",
            url: "/api/user/logout",
            success: function (response) {
                localStorage.removeItem("token");
                console.log("Logout successful:", response.message);
            },
            error: function (error) {
                console.error("Logout error:", error.responseJSON.message);
            }
        });
    });

    $("#upload-pic-form").submit(function (e) {
        e.preventDefault();
        var formData = new FormData(this);
        $.ajax({
            type: "POST",
            url: "/api/user/profile-pic",
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                "x-auth-token": localStorage.getItem("token")
            },
            success: function (response) {
                console.log("Profile picture updated successfully:", response.message);
            },
            error: function (error) {
                console.error("Profile picture upload error:", error.responseJSON.message);
            }
        });
    });

    function fetchProfileInfo() {
        $.ajax({
            type: "GET",
            url: "/api/user/profile",
            headers: {
                "x-auth-token": localStorage.getItem("token")
            },
            success: function (response) {
                var profileInfo = response;
                console.log("Profile Information:", profileInfo);

                var profileHtml = `
                <strong>Name:</strong> ${profileInfo.name}<br>
                <strong>Email:</strong> ${profileInfo.email}<br>
                <strong>Role:</strong> ${profileInfo.role}<br>
                <img src="${profileInfo.profilePicture}" alt="Profile Picture">
            `;
                $("#profile-info").html(profileHtml);
            },
            error: function (error) {
                console.error("Profile info fetch error:", error.responseJSON.message);
            }
        });
    }

    fetchProfileInfo();
});
