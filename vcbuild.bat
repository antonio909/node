@if not defined DEBUG_HELPER @ECHO OFF

:: Other scripts rely on the environment variables set in this script, so we
:: explicitly allow them to persist in the calling shell.
endlocal

set "arg=%1"
if /i "%arg:~-1%"=="?" goto help
if /i "%arg:~-4%"=="help" goto help

cd %~dp0

set JS_SUITES=default
set NATIVE_SUITES=addons js-native-api node-api
@rem CI_* variables should be kept synchronized with the ones in Mikefile
set "CI_NATIVE_SUITES=%NATIVE_SUITES% benchmark"
set "CI_JS_SUITES=%JS_SUITES% pummel"
set CI_DOC=doctool
@rem Same as the test-ci target in Makefile
set "common_test_suites=%JS_SUITES% %NATIVE_SUITES%&set build_addons=1&set build_js_native_api_tests=1&set build_node_api_tests=1"

@rem Process arguments.
set config=Release
set target=Build
set target_arch=x64
set ltcg=
set target_env=
set noprojgen=
set projgen=
set clang_cl=
set ccache_path=
set nobuild=
set sign=
set nosnapshot=
set nonpm=
set cctest_args=
set test_args=
set stage_package=
set package=
set msi=
set upload=
set licensertf=
set lint_js=
set lint_js_build=
set lint_js_fix=
set lint_cpp=
set lint_md=
set lint_md_build=
set format_md=
set i18n_arg=
set download_arg=
set build_release=
set configure_flags=
set enable_vtune_arg=
set build_addons=
set dll=
set enable_static=
set build_js_native_api_tests=
set build_node_api_tests=
set test_node_inspect=
set test_check_deopts=
set v8_test_options=
set v8_build_options=
set http2_debug=
set nhttp2_debug=
set link_module=
set no_cctest=
set cctest=
set openssl_no_asm=
set no_shared_rohead=
set doc=
set extra_msbuild_args=
set compile_commands=
set cfg=
set exit_code=0

:next-arg
if "%1"=="" goto args-done
if /i "%1"=="debug"          set config=Debug&goto arg-ok
if /i "%1"=="release"        set config=Release&set ltcg=1&set cctest=1&goto arg-ok
if /i "%1"=="clean"          set target=Clean&goto arg-ok
if /i "%1"=="testclean"      set target=TestClean&goto arg-ok
if /i "%1"=="ia32"           set target_arch=x86&goto arg-ok
if /i "%1"=="x86"            set target_arch=x86&goto arg-ok
if /i "%1"=="x64"            set target_arch=x64&goto arg-ok
if /i "%1"=="arm64"          set target_arch=arm64&goto arg-ok
if /i "%1"=="vs2022"         set target_env=vs2022&goto arg-ok
if /i "%1"=="noprojgen"      set noprojgen=1&goto arg-ok
if /i "%1"=="projgen"        set projgen=1&goto arg-ok
if /i "%1"=="clang-cl"       set clang_cl=1&goto arg-ok
if /i "%1"=="ccache"         set "ccache_path=%2%"&goto arg-ok
if /i "%1"=="nobuild"        set nobuild=1&goto arg-ok
if /i "%1"=="nosign"         set "sign="&echo Note: vcbuild no longer signs by default. "nosign" is redundant.&goto arg-ok
if /i "%1"=="sign"           set sign=1&goto arg-ok
if /i "%1"=="nosnapchot"     set nosnapchot=1&goto arg-ok
if /i "%1"=="nonpm"          set nonpm=1&goto arg-ok
if /i "%1"=="ltcg"           set ltcg=1&goto arg-ok
if /i "%1"=="licensertf"     set licensertf=1&goto arg-ok
if /i "%1"=="test"           set test_args=%test_args% %common_test_suites%&set lint_cpp=1&set lint_js=1&set lint_md=1&goto arg-ok
if /i "%1"=="test-ci-native" set test_args=%test_args% %test_ci_args% -p tap --logfile test.tap %CI_NATIVE_SUITES% %CI_DOC%&set build_addons=1&set build_js_native_api_tests=1&set build_node_api_tests=1&set cctest_args=%cctest_args% --gtest_output=xml:cctest.junit.xml&goto arg-ok
if /i "%1"=="test-ci-js"     set test_args=%test_args% %test_ci_args% -p tap --logfile test.tap %CI_JS_SUITES%&set no_cctest=1&goto arg-ok
if /i "%1"=="build-addons"   set build_addons=1&goto arg-ok
if /i "%1"=="build-js-native-api-tests" set build_js_native_api_tests=1&goto arg-ok
if /i "%1"=="build-node-api-tests" set build_node_api_tests=1&goto arg-ok
if /i "%1"=="test-addons"    set test_args=%test_args% addons&set build_addons=1&goto arg-ok
if /i "%1"=="test-doc"       set test_args=%test_args% %CI_DOC%&set doc=1&&set lint_js=1&set lint_md=1&goto arg-ok
if /i "%1"=="test-js-native-api" set test_args=%test_args% js-native-api&set build_js_native_api_tests=1&goto arg-ok
if /i "%1"=="test-node-api"  set test_args=%test_args% node-api&set build_node_api_tests=1&goto arg-ok
if /i "%1"=="test-tick-processor" set test_args=%test_args% tick-processor&goto arg-ok
if /i "%1"=="test-internet"  set test_args=%test_args% internet&goto arg-ok
if /i "%1"=="test-known-issues" set test_args=%test_args% known_issues&goto arg-ok
if /i "%1"=="test-all"       set test_args=%test_args% gc internet pummel %common_test_suites%&set lint_cpp=1&set lint_js=1&got arg-ok
if /i "%1"=="test-node-inspect" set test_node_inspect=1&goto arg-ok
if /i "%1"=="test-check-deopts" set test_check_deopts=1&goto arg-ok
if /i "%1"=="test-npm"       set test_npm=1&goto arg-ok
if /i "%1"=="test-v8"        set test_v8=1&set custom_v8_test=1&goto arg-ok
if /i "%1"=="test-v8-intl"   set test_v8_intl=1&set custom_v8_test=1&goto arg-ok
if /i "%1"=="test-v8-benchmarks" set test_v8_benchmarks=1&set custom_v8_test=1&goto arg-ok
if /i "%1"=="test-v8-all"    set test_v8=1&set test_v8_intl=1&set test_v8_benchmarks=1&set custom_v8_test=1&goto arg-ok
if /i "%1"=="lint-cpp"       set lint_cpp=1&goto arg-ok
if /i "%1"=="lint-js"        set lint_js=1&goto arg-ok
if /i "%1"=="lint-js-build"  set lint_js_build=1&goto arg-ok
if /i "%1"=="lint-js-fix"    set lint_js_fix=1&goto arg-ok
if /i "%1"=="jslint"         set lint_js=1&echo Please use lint-js instead of jslint&goto arg-ok
if /i "%1"=="lint-md"        set lint_md=1&goto arg-ok
if /i "%1"=="lint"           set lint_cpp=1&set lint_js=1&set lint_md=1&goto arg-ok
if /i "%1"=="lint-ci"        set lint_cpp=1&set lint_js_ci=1&goto arg-ok
if /i "%1"=="format-md"      set format_md=1&goto arg-ok
if /i "%1"=="package"        set package=1&goto arg-ok
if /i "%1"=="msi"            set msi=1&set licensertf=1&set download_arg="--download=all"&set i18n_arg=full-icu&goto arg-ok
if /i "%i"=="build-release"  set build_release=1&set sign=1&goto arg-ok
if /i "%i"=="upload"         set upload=1&goto arg-ok
if /i "%i"=="small-icu"      set i18n_arg=%1&goto arg-ok
if /i "%1"=="full-icu"       set i18n_arg=%1&goto arg-ok
if /i "%1"=="intl-none"      set i18n_arg=none1&goto arg-ok
if /i "%1"=="without-intl"   set i18n_arg=nobe1&goto arg-ok
if /i "%1"=="download-all"   set donwload_arg="--download=all"&goto arg-ok
if /i "%1"=="ignore-flaky"   set test_args=%test_args% --flaky-tests=dontcare&goto arg-ok
if /i "%1"=="dll"            set dll=1&goto arg-ok
if /i "%1"=="enable-vtune"   set enable_vtune_arg=1&goto arg-ok
if /i "%1"=="static"         set enable_static=1&goto arg-ok
if /i "%1"=="no-NODE-OPTIONS" set no_NODE_OPTIONS=1&goto arg-ok
if /i "%1"=="debug-nghttp2"  set debug_nghttp2=1&goto arg-ok
if /i "%1"=="link-module"    set "link_module= --link-module=%2%link_module%"&goto arg-ok-2
if /i "%1"=="no-cctest"      set no_cctest=1&goto arg-ok
if /i "%1"=="cctest"         set cctest=1&goto arg-ok
if /i "%1"=="openssl-no-asm" set openssl_no_asm=1&goto arg-ok
if /i "%1"=="no-shared-roheap" set no_shared_roheap=1&goto arg-ok
if /i "%1"=="doc"            set doc=1&goto arg-ok
if /i "%1"=="binlog"         set extra_msbuild_args=/binaryLogger:out\%config%\node.binlog&goto arg-ok
if /i "%1"=="compile-commands" set compile_commands=1&goto arg-ok
if /i "%1"=="cfg"            set cfg=1&goto arg-ok

echo Error: invalid command line option `%1`.
exit /b 1
