define(['app/app', 'app/directives/directives', 'app/services/mamnon/layoutService', 'app/services/mamnon/hoSoService', 'app/controllers/mamnon/accountController', 'bootstrap', 'beyond', 'slimscroll', 'signalr.hubs', 'select2', 'mCustomScrollbar'], function (app) {
    "use strict";

    app.controller('sidebarController', ['$scope', '$rootScope', '$modal', '$state',
            function ($scope, $rootScope, $modal, $state) {
                $.ajax({
                    type: 'POST',
                    url: '/Authentication/WebMenu_GetListBy_CurrentWebUserId',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (result) {
                        $scope.source = result;
                    }
                });
                if ($scope.source == null) {
                    window.location.href = "login.html";
                }
                var heightMenuLeft = $scope.source.length * 93 + 20 + 100; //20: padding, 100: logo
                var heightWindow = $(window).height();
                var heightPageBody = $('.page-body').height();
                $rootScope.iframeHeight = max(heightMenuLeft, heightWindow, heightPageBody);
                function max(a, b, c) {
                    var maxheight = a;
                    if (b > maxheight) {
                        maxheight = b;
                    }
                    if (c > maxheight) {
                        maxheight = c;
                    }
                    return maxheight;
                }
            }
    ]);

    app.controller('headerController', ['$scope', '$rootScope', '$modal', '$state', 'layoutService',
            function ($scope, $rootScope, $modal, $state, layoutService) {

                function state_1($this) {
                    $('.page-breadcrumbs').css('left', '0');// cai can test
                    $('.page-content').css('margin-left', '0');
                    $this.css('display', 'none');
                }

                function state_2($this) {
                    $this.removeClass('menu-compact');
                    $('.page-breadcrumbs').css('left', '125px');// cai can test
                    $('.page-content').css('margin-left', '115px');
                    $this.css('display', 'block');
                }

                /*js MENU-LEFT*/
                $('.sidebar-collapse').click(function () {
                    var $this = $('.page-sidebar');
                    if ($this.hasClass('menu-compact')) {
                        $('.page-breadcrumbs').css('right', '0');
                        $('.page-breadcrumbs').css('z-index', '999999999');
                        $('.account-area.sign-out').css('right', '0');
                        $('.account-area.sign-out').css('top', '15px');

                    }
                    else {
                        /* comment */
                        //$('.page-breadcrumbs').css('right', '-115px');
                        $('.page-breadcrumbs').css('z-index', '1');
                        $('.account-area.sign-out').css('right', '115px');
                        $('.account-area.sign-out').css('top', '0');
                    }
                })
                $('.sidebar-collapse').click(function () {
                    if ($(window).width() >= 992) {
                        var $this = $('.page-sidebar');
                        if ($this.hasClass('menu-compact')) {// menu an

                            $('#sidebar .bg-logo').css('background', 'none');
                            //$('.page-sidebar').css('z-index', '-1');
                            $('.page-breadcrumbs').css('left', '0');
                        }
                        else {

                            $('.bg-logo').css('background', '#fff');
                            //$('.page-sidebar').css('z-index', '9999');
                            $('.page-breadcrumbs').css('left', '115px');
                        }
                    }
                    else {//991
                        var $this = $('.page-sidebar');
                        if ($this.hasClass('menu-compact')) {// menu hien

                            $('.bg-logo').css('background', '#fff');
                            $('.page-sidebar').css('z-index', '9999');

                            $('#sidebar .bg-logo img').css('display', 'block');
                            $('.logo-breadcrumbs').css('width', '115px');
                            $('.page-breadcrumbs').css('right', '0');
                            $('.page-breadcrumbs').css('left', '115px');
                            $('.page-breadcrumbs').css('z-index', '999999999');
                            $('.account-area.sign-out').css('right', '115px');
                            $('.account-area.sign-out').css('top', '0px');
                            $('.page-content').css('margin-left', '115px');
                        }
                        else {// menu an

                            $('.bg-logo').css('background', 'none');
                            $('.page-sidebar').css('z-index', '-1');
                            $('#sidebar .bg-logo img').css('display', 'none');
                            $('.page-breadcrumbs').css('left', '0');
                            $('.page-breadcrumbs').css('right', '0');
                            $('.page-breadcrumbs').css('z-index', '1');
                            $('.account-area.sign-out').css('right', '0');
                            $('.account-area.sign-out').css('top', '0');
                            $('.page-content').css('margin-left', '0');
                        }
                    }
                });


                /*js MENU-LEFT*/
                $('#sidebar-collapse').click(function () {
                    if ($(window).width() >= 992) {
                        if ($('#sidebar-collapse').hasClass('active')) {
                            $('.page-body').css('padding-top', '75px');
                        } else {
                            $('.page-body').css('padding-top', '50px');
                        }
                    }
                    else {
                        if ($('#sidebar-collapse').hasClass('active')) {
                            $('.page-body').css('padding-top', '50px');
                        } else {
                            $('.page-body').css('padding-top', '50px');
                        }
                    }
                });
                /*dropdown sign out*/
                $('.sidebar-collapse').click(function () {
                    if ($(window).width() >= 992) {

                        var $this = $('.page-sidebar');
                        if ($this.hasClass('menu-compact')) {
                            $('.page-breadcrumbs .dropdown-menu').css('top', '48px');
                        }
                        else {
                            $('.page-breadcrumbs .dropdown-menu').css('top', '40px');
                        }
                    }
                    else if ($(window).width() <= 991 && $(window).width() >= 768) {
                        var $this = $('.page-sidebar');
                        if ($this.hasClass('menu-compact')) {
                            $('.page-breadcrumbs .dropdown-menu').css('top', '40px');
                        }
                        else {
                            $('.page-breadcrumbs .dropdown-menu').css('top', '40px');
                        }
                    }
                    else {
                        var $this = $('.page-sidebar');
                        if ($this.hasClass('menu-compact')) {
                            $('.page-breadcrumbs .dropdown-menu').css('top', '20px');
                        }
                        else {
                            $('.page-breadcrumbs .dropdown-menu').css('top', '20px');
                        }
                    }
                })
                /*dropdown sign out*/


                $('#sidebar-collapse').click(function () {
                    if ($('#sidebar-collapse').hasClass('active')) {
                        $('.page-breadcrumbs').css('min-height', '65px');
                        $('.page-breadcrumbs .pull-right').css('top', '20px');
                        $('.logo-breadcrumbs').css('display', 'block');
                    }
                    else {
                        $('.page-breadcrumbs').css('min-height', '40px');
                        $('.page-breadcrumbs .pull-right').css('top', '10px');
                        $('.logo-breadcrumbs').css('display', 'none');
                    }
                });

                if ($(window).width() >= 992) {
                    $('#sidebar-collapse').click(function () {
                        var $this = $('#sidebar-collapse');
                        if ($this.hasClass('active')) {
                            $('.page-content').css('margin-left', '0');
                        }
                        else {
                            $('.page-content').css('margin-left', '115px');
                        }
                    });
                }

                if ($(window).width() <= 991) {

                    $('#sidebar-collapse').click(function () {
                        if ($('#sidebar-collapse').hasClass('active')) {
                            //$('#sidebar-collapse').css('left', '115px');
                            $('.page-breadcrumbs').css('min-height', '40px');
                            $('.logo-breadcrumbs').css('display', 'none');
                        }
                        else {
                            $('#sidebar-collapse').css('top', '0px');

                            //$('#sidebar-collapse').css('left', '0');
                            $('.page-breadcrumbs').css('min-height', '40px');
                            $('.logo-breadcrumbs').css('display', 'none');
                        }
                    });
                    $('#sidebar-collapse').click(function () {
                        var $this = $('#sidebar-collapse');
                        if ($this.hasClass('active')) {
                            $('.page-content').css('margin-left', '0');
                        }
                        else {
                            $('.page-content').css('margin-left', '0');
                        }
                    });
                }
                if ($(window).width() > 1920) {
                    if ($(window).height >= $('body').height) {
                        $('body').addClass('fixed-width');
                    }
                }
                else {
                    $('body').removeClass('fixed-width');
                }

                if ($(window).width() <= 880) {
                    var $this = $('.page-sidebar');
                    if ($this.hasClass('menu-compact')) {
                        $('.page-sidebar').css('z-index', '-1');
                        $('.page-breadcrumbs').css('left', '115px');// cai can test
                    }
                    else {
                        $('.page-sidebar').css('z-index', '9999');
                        $('.page-breadcrumbs').css('left', '0');// cai can test
                    }
                }

                /*BU add*/

                //default when open
                if ($(window).width() >= 992) {
                    $('.account-area.sign-out').css({ 'right': '115px' });
                    $('#sidebar-collapse').removeClass('active');
                    $('#sidebar').removeClass('menu-compact');
                }
                else {
                    $('.account-area.sign-out').css({ 'right': '0'});
                    $('#sidebar-collapse').removeClass('active');
                    $('#sidebar').removeClass('menu-compact');
                }
                //end default when open

                $('#sidebar-collapse').click(function () {
                    var $this = $('.page-sidebar');
                    if ($(window).width() >= 992) {
                        if ($this.hasClass('menu-compact')) {  //close menu
                            $('.account-area.sign-out').css('right', '0');
                            $('.logo-breadcrumbs').css('display', 'block');
                            $('.sidebar-collapse .fa-bars').css('top', '20px');
                            $('.page-breadcrumbs').css('min-height', '65px');
                            $('.page-content').css('margin-left', '0');
                            $('.bg-logo img').css('display', 'none');
                            $('.logo-breadcrumbs').css({ 'width': '100%', 'text-align': 'center' });
                            $('.page-sidebar').css('background', 'none');
                        }
                        else { //open menu
                            $('.account-area.sign-out').css({ 'right': '115px', 'top': '0' });
                            $('.logo-breadcrumbs').css('display', 'none');
                            $('.sidebar-collapse .fa-bars').css('top', '5px');
                            $('.page-breadcrumbs').css('min-height', '40px');
                            $('.page-content').css('margin-left', '115px');
                            $('.bg-logo img').css('display', 'block');
                            $('.page-sidebar').css('background', '#f68220');
                        }
                    }
                    else {
                        $('.logo-breadcrumbs').css('display', 'none');
                        $('.page-breadcrumbs').css('min-height', '40px');
                        if ($this.hasClass('menu-compact')) { //open menu
                            $('.account-area.sign-out').css({ 'right': '115px', 'top': '0' });
                            $('.sidebar-collapse .fa-bars').css('top', '12px');
                            $('.page-content').css('margin-left', '0');
                            $('#sidebar').css('display', 'block');
                            $('.page-sidebar').css('background', '#f68220');
                        }
                        else { //close menu
                            $('.account-area.sign-out').css('right', '0');
                            $('.sidebar-collapse .fa-bars').css('top', '5px');
                            $('#sidebar').css('display', 'none');
                            $('.page-content').css('margin-left', '0');
                            $('.page-sidebar').css('background', 'none');
                        }
                    }
                });
                /*end BU add */

                /*-----------------------------------------------start resize*/
                $(window).resize(function () {
                    if ($(window).width() <= 991) {
                        var $this = $('.page-sidebar');
                        if ($this.hasClass('menu-compact')) {
                            $('.page-sidebar').css('z-index', '9999');
                        }
                        else {
                            $('.page-sidebar').css('z-index', '-1');
                        }
                    }
                    /*dropdown sign out*/
                    //$('.sidebar-collapse').click(function () {
                        if ($(window).width() >= 992) {

                            var $this = $('.page-sidebar');
                            if ($this.hasClass('menu-compact')) {
                                $('.page-breadcrumbs .dropdown-menu').css('top', '48px');
                            }
                            else {
                                $('.page-breadcrumbs .dropdown-menu').css('top', '40px');
                            }
                        }
                    //})
                        if ($(window).width() <= 991 && $(window).width() >= 768) {
                            $('.page-breadcrumbs .dropdown-menu').css('top', '40px');
                        }
                       if ($(window).width() <= 767) {
                            $('.page-breadcrumbs .dropdown-menu').css('top', '20px');
                        }
                    
                    /*dropdown sign out*/
                });
                $(window).resize(function () {
                    /* resize without click ok */
                    var $this = $('#sidebar');
                    if ($(window).width() >= 992) {
                        //alert('bucbuc');
                        if ($this.hasClass('menu-compact')) { //close menu
                            $('.page-body').css('padding-top', '75px');
                            $('.account-area.sign-out').css({ 'right': '0', 'top': '15px' });
                            $('.logo-breadcrumbs').css('display', 'block');
                            $('.sidebar-collapse .fa-bars').css('top', '20px');
                            $('.page-breadcrumbs').css('min-height', '65px');
                            $('#sidebar-collapse').addClass('active');
                            $('.page-breadcrumbs').css('left', '0');// cai can test
                            $('.page-content').css('margin-left', '0');
                            $this.css('display', 'none');
                            $('.bg-logo').css('background', 'none');
                            $('.logo-breadcrumbs').css({ 'width': '100%', 'text-align': 'center' });
                            $('.bg-logo img').css('display', 'none');

                            $('.page-sidebar').css('background', 'none');
                        }
                        else { //open menu
                            $('.page-body').css('padding-top', '50px');
                            $('.account-area.sign-out').css({'right': '115px', 'top': '0'});
                            $('.logo-breadcrumbs').css('display', 'none');
                            $('.sidebar-collapse .fa-bars').css('top', '5px');
                            $('.page-breadcrumbs').css('min-height', '40px');
                            $('#sidebar-collapse').removeClass('active');
                            $('.page-breadcrumbs').css('left', '115px');// cai can test
                            $('.page-content').css('margin-left', '115px');
                            $this.css('display', 'block');
                            $('.bg-logo').css('background', 'rgb(255, 255, 255)');
                            $('.bg-logo img').css('display', 'block');

                            $('.page-sidebar').css('background', '#f68220');
                        }
                    }
                    else {
                        $('.page-body').css('padding-top', '50px');
                        $('.logo-breadcrumbs').css('display', 'none');
                        $('.page-breadcrumbs').css('min-height', '40px');
                        if ($this.hasClass('menu-compact')) { //open menu
                            $('.account-area.sign-out').css({ 'right': '115px', 'top': '0' });
                            $('.sidebar-collapse .fa-bars').css('top', '12px');
                            $('#sidebar-collapse').addClass('active');
                            $('.page-breadcrumbs').css('left', '115px');// cai can test
                            $('.page-content').css('margin-left', '0');
                            $this.css('display', 'block');
                            $('.bg-logo').css('background', 'rgb(255, 255, 255)');
                            $('.bg-logo img').css('display', 'block');
                            $('.page-sidebar').css('background', '#f68220');
                        }
                        else { //close menu
                            $('.account-area.sign-out').css('right', '0');
                            $('.sidebar-collapse .fa-bars').css('top', '5px');
                            $('#sidebar-collapse').removeClass('active');
                            $('.page-breadcrumbs').css('left', '0');// cai can test
                            $('.page-content').css('margin-left', '0');
                            $this.css('display', 'none');
                            $('.bg-logo').css('background', 'none');
                            $('.bg-logo img').css('display', 'none');

                            $('.page-sidebar').css('background', 'none');
                        }
                    }
                    /* end resize without click ok */
                });
                //---------------------------------------------------end resize

                $scope.$watch('$root.toState', function () {
                    if ($('#qnimate').hasClass('popup-box-on')) {
                        $("#removeClass").click();
                    }
                });

                $rootScope.unreadMessages = [];

                function getTinNhanChuaDoc() {
                    if ($rootScope.session.WebGroupId == MANAGER.WEBGROUP_HOCSINH) {
                        layoutService.GetTinNhanChuaDocCuaHocSinh($rootScope.session.DepartmentId, $rootScope.session.NamHocId).then(function (result) {
                            $rootScope.unreadMessages = result.data;
                        });
                    }
                    else if ($rootScope.session.WebGroupId == MANAGER.WEBGROUP_GIAOVIEN) {
                        layoutService.GetTinNhanChuaDocCuaGiaoVien($rootScope.session.NamHocId).then(function (result) {
                            $rootScope.unreadMessages = result.data;
                        });
                    }
                }
                getTinNhanChuaDoc();


                var chatHub = $.connection.chatHub;
                chatHub.client.getTinNhanChuaDoc = function () {
                    getTinNhanChuaDoc();
                }
                //Start the connection.
                $.connection.hub.start();

                $scope.changePassword = function () {
                    $modal.open({
                        animation: true,
                        templateUrl: '/app/views/mamnon/QuanLyUsers/User.html',
                        controller: 'accountController'
                    });
                }

                $scope.logout = function () {
                    $.ajax({
                        type: 'POST',
                        url: '/Authentication/LogOff',
                        contentType: "application/json; charset=utf-8",
                        async: false,
                        success: function (result) {
                            //window.location = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=" + window.location;
                            window.location.href = '/login.html';
                        }
                    });
                }
            }
    ]);

    app.controller('tinNhanController', ['$scope', '$rootScope', '$modal', '$state', '$timeout', 'layoutService', 'toastr',
        function ($scope, $rootScope, $modal, $state, $timeout, layoutService, toastr) {
            $("#addClass").click(function () {
                $('#qnimate').addClass('popup-box-on');
                $scope.getTinNhan();
            });
            $("#removeClass").click(function () {
                $('#qnimate').removeClass('popup-box-on');
            });

            $scope.obj = {
                NguoiGuiId: $rootScope.session.UserId,
                NguoiNhanId: null,
                LopId: $rootScope.session.DepartmentId,
                NamHocId: $rootScope.session.NamHocId
            }

            $.connection.hub.stop();
            var chatHub = $.connection.chatHub;
            chatHub.client.getTinNhan = function () {
                if ($('#qnimate').hasClass('popup-box-on'))
                    $scope.getTinNhan();
            }
            //Start the connection.
            $.connection.hub.start();

            $scope.PutTinNhan = function () {
                if ($scope.obj.NoiDung == null || $scope.obj.NoiDung.trim() == "")
                    return;
                $scope.obj.ThoiGianGui = new Date();
                layoutService.PutTinNhan($scope.obj).then(function (result) {
                    if (result == 0) {
                        toastr.error('Có lỗi!');
                    }
                    else {
                        $scope.tinNhanList.push(Object.assign({}, $scope.obj)); //tham trị
                        $scope.obj.NoiDung = "";
                        chatHub.server.getTinNhan($rootScope.session.DepartmentId);
                        $timeout(function () {
                            chatHub.server.getTinNhanChuaDoc($rootScope.session.DepartmentId);
                        }, 300);
                    }
                });
            }
            $scope.getTinNhan = function () {
                layoutService.GetTinNhan($rootScope.session.Id, $rootScope.session.DepartmentId, $rootScope.session.NamHocId).then(function (result) {
                    $scope.tinNhanList = result.data;
                    if ($rootScope.unreadMessages.length > 0) {
                        var tempArray = $rootScope.unreadMessages; //gán vào mảng tạm
                        for (var i = 0, l = $scope.tinNhanList.length; i < l; i++) {
                            //tìm trong mảng tin nhắn nếu có trong mảng chưa đọc thì loại phần tử đó ra khỏi mảng chưa đọc
                            var pos = tempArray.map(function (e) { return e.Id; }).indexOf($scope.tinNhanList[i].Id);
                            if (pos != -1) {
                                //loại ra khỏi mảng chưa đọc
                                $rootScope.unreadMessages = $rootScope.unreadMessages.filter(function (item) {
                                    return item.Id != $scope.tinNhanList[i].Id
                                });
                            }
                        }
                    }
                });
            }
            //$scope.getTinNhan();
            $scope.keyPress = function () {
                $scope.PutTinNhan();
            }
            $scope.getImage = function (nguoiGuiId) {
                return nguoiGuiId != $rootScope.session.UserId ? "/assets/img/home-phuhuynh/img-chat-gv.png" : "/assets/img/home-phuhuynh/img-chat.png";
            }
        }
    ]);
    app.controller('tinNhanGVController', ['$scope', '$rootScope', '$modal', '$state', '$timeout', 'layoutService', 'hoSoService', 'toastr',
        function ($scope, $rootScope, $modal, $state, $timeout, layoutService, hoSoService, toastr) {
            $("#addClass").click(function () {
                $('#qnimate').addClass('popup-box-on');
                if ($('#qnimate').hasClass('popup-box-on') && !$('#qnimate').hasClass('direct-chat-contacts-open'))
                    $scope.getTinNhan();
            });
            $("#removeClass").click(function () {
                $('#qnimate').removeClass('popup-box-on');
            });

            $scope.btnDanhSachClick = function () {
                $("#qnimate").toggleClass('direct-chat-contacts-open');
            }
            $scope.contactClick = function () {
                $("#qnimate").removeClass("direct-chat-contacts-open");
            }

            var initializing = true;
            var getLopPromise = new Promise(function (resolve, reject) {
                hoSoService.GetDanhSachLopByGiaoVien($rootScope.session.NamHocId, null, null, $rootScope.session.GiaoVien, null, null).then(function (result) {
                    $scope.listLop = result.data;
                    if ($scope.listLop.length > 0 && $rootScope.lopSelected == null)
                        $rootScope.lopSelected = $scope.listLop[0].Lop_Oid;
                    resolve();
                });
            });
            var getHocSinhPromise = new Promise(function (resolve, reject) {
                getLopPromise.then(function () {
                    hoSoService.GetDanhSachHocSinhByLopAndGiaoVien($rootScope.session.NamHocId, null, $rootScope.lopSelected, $rootScope.session.GiaoVien, null, null).then(function (result1) {
                        $scope.listHocSinh = result1.data;
                        if ($scope.listHocSinh.length > 0 && $rootScope.hocSinhChatBoxSelected == null)
                            $rootScope.hocSinhChatBoxSelected = $scope.listHocSinh[0].HocSinh_Oid;
                        resolve();
                    });
                });
            });
            getHocSinhPromise.then(function () {
                $('#id_lopchatbox_select').select2({
                    minimumResultsForSearch: Infinity
                }).val($rootScope.lopSelected).trigger('change');
                //$('#id_hocsinh_select').select2({
                //    "language": {
                //        "noResults": function () {
                //            return "Không tìm thấy học sinh";
                //        }
                //    }
                //}).val($rootScope.hocSinhChatBoxSelected).trigger('change');
            });

            $scope.$watch('$root.lopSelected', function () {
                if (initializing) {
                    $timeout(function () { initializing = false; });
                } else {
                    if ($rootScope.lopSelected != null) {
                        hoSoService.GetDanhSachHocSinhByLopAndGiaoVien($rootScope.session.NamHocId, null, $rootScope.lopSelected, $rootScope.session.GiaoVien, null, null).then(function (result1) {
                            $scope.listHocSinh = result1.data;
                            if ($scope.listHocSinh.length > 0)
                                $rootScope.hocSinhChatBoxSelected = $scope.listHocSinh[0].HocSinh_Oid;
                        });
                    }
                }
            });
            getHocSinhPromise.then(function () {
                $scope.obj = {
                    NguoiGuiId: $rootScope.session.UserId,
                    NguoiNhanId: $rootScope.hocSinhChatBoxSelected, //sẽ chọn học sinh từ combobox
                    LopId: $rootScope.lopSelected, //chọn học sinh, lấy dc lớp của học sinh đó
                    NamHocId: $rootScope.session.NamHocId //chọn học sinh, lấy dc năm học sinh đang theo học
                }
            });

            $.connection.hub.stop();
            var chatHub = $.connection.chatHub;
            chatHub.client.getTinNhan = function () {
                if ($('#qnimate').hasClass('popup-box-on') && !$('#qnimate').hasClass('direct-chat-contacts-open')) {
                    //$scope.getTinNhan(); //không hiểu tại sao phụ huynh gửi cho giáo viên gọi hàm getTinNhan ko cập nhật ra view
                    $("#removeClass").click();
                    $("#addClass").click();
                }
            }
            //Start the connection.
            $.connection.hub.start();

            $scope.PutTinNhan = function () {
                if ($scope.obj.NoiDung == null || $scope.obj.NoiDung.trim() == "")
                    return;

                $scope.obj.NguoiNhanId = $rootScope.hocSinhChatBoxSelected;
                $scope.obj.LopId = $rootScope.lopSelected;
                $scope.obj.ThoiGianGui = new Date();
                layoutService.PutTinNhan($scope.obj).then(function (result) {
                    if (result == 0) {
                        toastr.error('Có lỗi!');
                    }
                    else if (result == 2) {
                        toastr.error('Người nhận chưa có tài khoản đăng nhập!');
                    }
                    else {
                        $scope.tinNhanList.push(Object.assign({}, $scope.obj)); //tham trị
                        $scope.obj.NoiDung = "";
                        chatHub.server.getTinNhan($rootScope.session.DepartmentId);
                        $timeout(function () {
                            chatHub.server.getTinNhanChuaDoc($rootScope.session.DepartmentId);
                        }, 300);
                    }
                });
            }
            $scope.getTinNhan = function () {
                layoutService.GetTinNhan($rootScope.hocSinhChatBoxSelected, $rootScope.lopSelected, $rootScope.session.NamHocId).then(function (result) {
                    $scope.tinNhanList = result.data;
                    if ($rootScope.unreadMessages.length > 0) {
                        var tempArray = $rootScope.unreadMessages; //gán vào mảng tạm
                        for (var i = 0, l = $scope.tinNhanList.length; i < l; i++) {
                            //tìm trong mảng tin nhắn nếu có trong mảng chưa đọc thì loại phần tử đó ra khỏi mảng chưa đọc
                            var pos = tempArray.map(function (e) { return e.Id; }).indexOf($scope.tinNhanList[i].Id);
                            if (pos != -1) {
                                //loại ra khỏi mảng chưa đọc
                                $rootScope.unreadMessages = $rootScope.unreadMessages.filter(function (item) {
                                    return item.Id != $scope.tinNhanList[i].Id
                                });
                            }
                        }
                    }
                });
            }
            //getHocSinhPromise.then(function () {
            //    $scope.getTinNhan();
            //});
            $scope.keyPress = function () {
                $scope.PutTinNhan();
            }
            $scope.getImage = function (nguoiGuiId) {
                return nguoiGuiId != $rootScope.session.UserId ? "/assets/img/home-phuhuynh/img-chat-gv.png" : "/assets/img/home-phuhuynh/img-chat.png";
            }
            $scope.isChuaNhan = function (hocSinh) {
                if ($rootScope.unreadMessages.length > 0) {
                    var tempArray = $rootScope.unreadMessages; //gán vào mảng tạm
                    var pos = tempArray.map(function (e) { return e.NguoiGui_HocSinhId; }).indexOf(hocSinh.HocSinh_Oid);
                    if (pos != -1) {
                        hocSinh.ChuaNhan = true;
                        return true;
                    } else {
                        hocSinh.ChuaNhan = false;
                    }
                }
            }
        }
    ]);
});
