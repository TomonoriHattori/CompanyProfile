#!/usr/bin/env python3

# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START gae_python37_app]
from flask import *
from flask import request,redirect
from flask_httpauth import HTTPBasicAuth

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__,template_folder="./")
auth = HTTPBasicAuth()

users = {
    "ailia": "ailia",
}

@auth.get_password
def get_pw(username):
    if username in users:
        return users.get(username)
    return None

@app.route("/speech", methods=["GET", "POST"])
def speech_redirect_page():
    return redirect("https://www.ailia.ai/speech")

@app.route("/en/speech", methods=["GET", "POST"])
def speech_en_redirect_page():
    return redirect("https://www.ailia.ai/en/speech")

# dx
@app.route("/dx", methods=["GET", "POST"])
def dx_redirect_page():
    return redirect("/dx/")

@app.route("/en/dx", methods=["GET", "POST"])
def dx_en_redirect_page():
    return redirect("/en/dx/")

@app.route("/dx/", methods=["GET", "POST"])
def dx_page():
    return render_template("/dx/index.html")

@app.route("/en/dx/", methods=["GET", "POST"])
def dx_en_page():
    return render_template("/dx/index_en.html")

@app.route('/dx/css/<path:filename>')
@app.route('/en/dx/css/<path:filename>')
def dx_css_static(filename):
    return send_from_directory(app.root_path + '/dx/css/', filename, conditional=True)

@app.route('/dx/img/<path:filename>')
@app.route('/en/dx/img/<path:filename>')
def dx_image_static(filename):
    return send_from_directory(app.root_path + '/dx/img/', filename, conditional=True)

@app.route('/dx/js/<path:filename>')
@app.route('/en/dx/js/<path:filename>')
def dx_js_static(filename):
    return send_from_directory(app.root_path + '/dx/js/', filename, conditional=True)

@app.route('/dx/items/<path:filename>')
@app.route('/en/dx/items/<path:filename>')
def dx_items_static(filename):
    return send_from_directory(app.root_path + '/dx/items/', filename, conditional=True)

# case
@app.route("/case/blueing/", methods=["GET", "POST"])
def case_blueing_page():
    return render_template("/case/blueing/index.html")

@app.route('/case/blueing/css/<path:filename>')
def case_blueing_css_static(filename):
    return send_from_directory(app.root_path + '/case/blueing/css/', filename, conditional=True)

@app.route('/case/blueing/img/<path:filename>')
def case_blueing_image_static(filename):
    return send_from_directory(app.root_path + '/case/blueing/img/', filename, conditional=True)

@app.route('/case/blueing/js/<path:filename>')
def case_blueing_js_static(filename):
    return send_from_directory(app.root_path + '/case/blueing/js/', filename, conditional=True)

# top
@app.route("/", methods=["GET", "POST"])
def top_page():
    return render_template("/top/index.html")

@app.route("/en/", methods=["GET", "POST"])
def top_en_page():
    return render_template("/top/index_en.html")

@app.route('/css/<path:filename>')
@app.route('/en/css/<path:filename>')
def top_css_static(filename):
    return send_from_directory(app.root_path + '/top/css/', filename, conditional=True)

@app.route('/img/<path:filename>')
@app.route('/en/img/<path:filename>')
def top_image_static(filename):
    return send_from_directory(app.root_path + '/top/img/', filename, conditional=True)

@app.route('/js/<path:filename>')
@app.route('/en/js/<path:filename>')
def top_js_static(filename):
    return send_from_directory(app.root_path + '/top/js/', filename, conditional=True)

@app.route('/items/<path:filename>')
@app.route('/en/items/<path:filename>')
def top_items_static(filename):
    return send_from_directory(app.root_path + '/top/items/', filename, conditional=True)

# embedded
@app.route("/embedded", methods=["GET", "POST"])
def embedded_redirect_page():
    return redirect("/embedded/")

@app.route("/en/embedded", methods=["GET", "POST"])
def embedded_en_redirect_page():
    return redirect("/en/embedded/")

@app.route("/embedded/", methods=["GET", "POST"])
def embedded_page():
    return render_template("/embedded/index.html")

@app.route("/en/embedded/", methods=["GET", "POST"])
def embedded_en_page():
    return render_template("/embedded/index_en.html")

@app.route('/embedded/css/<path:filename>')
@app.route('/en/embedded/css/<path:filename>')
def embedded_css_static(filename):
    return send_from_directory(app.root_path + '/embedded/css/', filename, conditional=True)

@app.route('/embedded/img/<path:filename>')
@app.route('/en/embedded/img/<path:filename>')
def embedded_image_static(filename):
    return send_from_directory(app.root_path + '/embedded/img/', filename, conditional=True)

@app.route('/embedded/js/<path:filename>')
@app.route('/en/embedded/js/<path:filename>')
def embedded_js_static(filename):
    return send_from_directory(app.root_path + '/embedded/js/', filename, conditional=True)

@app.route('/embedded/items/<path:filename>')
@app.route('/en/embedded/items/<path:filename>')
def embedded_items_static(filename):
    return send_from_directory(app.root_path + '/embedded/items/', filename, conditional=True)

# universe
@app.route("/universe", methods=["GET", "POST"])
def universe_redirect_page():
    return redirect("/universe/")

@app.route("/universe/", methods=["GET", "POST"])
def universe_page():
    return render_template("/universe/index.html")

@app.route('/universe/css/<path:filename>')
def universe_css_static(filename):
    return send_from_directory(app.root_path + '/universe/css/', filename, conditional=True)

@app.route('/universe/img/<path:filename>')
def universe_image_static(filename):
    return send_from_directory(app.root_path + '/universe/img/', filename, conditional=True)

@app.route('/universe/js/<path:filename>')
def universe_js_static(filename):
    return send_from_directory(app.root_path + '/universe/js/', filename, conditional=True)

# license
@app.route("/license/", methods=["GET", "POST"])
def license_page():
    return render_template("/license/index.html")

@app.route("/en/license/", methods=["GET", "POST"])
def license_en_page():
    return render_template("/license/index_en.html")

@app.route("/license/en/", methods=["GET", "POST"])
def license_redirect_page():
    return redirect("/en/license/")

@app.route('/license/css/<path:filename>')
@app.route('/en/license/css/<path:filename>')
def license_css_static(filename):
    return send_from_directory(app.root_path + '/license/css/', filename, conditional=True)

@app.route('/license/images/<path:filename>')
@app.route('/en/license/images/<path:filename>')
def license_image_static(filename):
    return send_from_directory(app.root_path + '/license/images/', filename, conditional=True)

@app.route('/license/js/<path:filename>')
@app.route('/en/license/js/<path:filename>')
def license_js_static(filename):
    return send_from_directory(app.root_path + '/license/js/', filename, conditional=True)

@app.route('/license/pdf/<path:filename>')
def license_pdf_static(filename):
    return send_from_directory(app.root_path + '/license/pdf/', filename, conditional=True)

# models
@app.route("/models", methods=["GET", "POST"])
def models_redirect_page():
    return redirect("/models/")

@app.route("/en/models", methods=["GET", "POST"])
def models_en_redirect_page():
    return redirect("/en/models/")

@app.route("/models/", methods=["GET", "POST"])
def models_page():
    return render_template("/models/index.html")

@app.route("/en/models/", methods=["GET", "POST"])
def models_en_page():
    return render_template("/models/index_en.html")

@app.route('/models/css/<path:filename>')
@app.route('/en/models/css/<path:filename>')
def models_css_static(filename):
    return send_from_directory(app.root_path + '/models/css/', filename, conditional=True)

@app.route('/models/img/<path:filename>')
@app.route('/en/models/img/<path:filename>')
def models_image_static(filename):
    return send_from_directory(app.root_path + '/models/img/', filename, conditional=True)

@app.route('/models/js/<path:filename>')
@app.route('/en/models/js/<path:filename>')
def models_js_static(filename):
    return send_from_directory(app.root_path + '/models/js/', filename, conditional=True)

# sdk
@app.route("/sdk", methods=["GET", "POST"])
def sdk_redirect_page():
    return redirect("/sdk/")

@app.route("/en/sdk", methods=["GET", "POST"])
def sdk_en_redirect_page():
    return redirect("/en/sdk/")

@app.route("/sdk/", methods=["GET", "POST"])
def sdk_page():
    return render_template("/sdk/index.html")

@app.route("/en/sdk/", methods=["GET", "POST"])
def sdk_en_page():
    return render_template("/sdk/index_en.html")

@app.route('/sdk/css/<path:filename>')
@app.route('/en/sdk/css/<path:filename>')
def sdk_css_static(filename):
    return send_from_directory(app.root_path + '/sdk/css/', filename, conditional=True)

@app.route('/sdk/img/<path:filename>')
@app.route('/en/sdk/img/<path:filename>')
def sdk_image_static(filename):
    return send_from_directory(app.root_path + '/sdk/img/', filename, conditional=True)

@app.route('/sdk/js/<path:filename>')
@app.route('/en/sdk/js/<path:filename>')
def sdk_js_static(filename):
    return send_from_directory(app.root_path + '/sdk/js/', filename, conditional=True)

# contest
@app.route("/contest", methods=["GET", "POST"])
def contest_redirect_page():
    return redirect("/contest/")

@app.route("/contest/", methods=["GET", "POST"])
def contest_page():
    return render_template("/contest/index.html")

@app.route('/contest/assets/<path:filename>')
def contest_css_static(filename):
    return send_from_directory(app.root_path + '/contest/assets/', filename, conditional=True)

# event
@app.route("/event/202408", methods=["GET", "POST"])
def event_redirect_page():
    return redirect("/event/202408/")

@app.route("/event/202408/", methods=["GET", "POST"])
def evente_page():
    return render_template("/event/202408/index.html")

@app.route('/event/202408/css/<path:filename>')
def event_css_static(filename):
    return send_from_directory(app.root_path + '/event/202408/css/', filename, conditional=True)

@app.route('/event/202408/images/<path:filename>')
def event_image_static(filename):
    return send_from_directory(app.root_path + '/event/202408/images/', filename, conditional=True)

@app.route('/event/202408/js/<path:filename>')
def event_js_static(filename):
    return send_from_directory(app.root_path + '/event/202408/js/', filename, conditional=True)

# contact
@app.route("/contact", methods=["GET", "POST"])
def contact_redirect_page():
    return redirect("/contact/")

@app.route("/en/contact", methods=["GET", "POST"])
def contact_en_redirect_page():
    return redirect("/en/contact/")

@app.route("/contact/", methods=["GET", "POST"])
def contact_page():
    return render_template("/contact/index.html")

@app.route("/en/contact/", methods=["GET", "POST"])
def contact_en_page():
    return render_template("/contact/index_en.html")

@app.route('/contact/css/<path:filename>')
@app.route('/en/contact/css/<path:filename>')
def contact_css_static(filename):
    return send_from_directory(app.root_path + '/contact/css/', filename, conditional=True)

@app.route('/contact/img/<path:filename>')
@app.route('/en/contact/img/<path:filename>')
def contact_image_static(filename):
    return send_from_directory(app.root_path + '/contact/img/', filename, conditional=True)

# works
@app.route("/works", methods=["GET", "POST"])
def works_redirect_page():
    return redirect("/works/")

@app.route("/en/works", methods=["GET", "POST"])
def works_en_redirect_page():
    return redirect("/en/works/")

@app.route("/works/", methods=["GET", "POST"])
def works_page():
    return render_template("/works/index.html")

@app.route("/en/works/", methods=["GET", "POST"])
def works_en_page():
    return render_template("/works/index_en.html")

@app.route('/works/css/<path:filename>')
@app.route('/en/works/css/<path:filename>')
def works_css_static(filename):
    return send_from_directory(app.root_path + '/works/css/', filename, conditional=True)

@app.route('/works/img/<path:filename>')
@app.route('/en/works/img/<path:filename>')
def works_image_static(filename):
    return send_from_directory(app.root_path + '/works/img/', filename, conditional=True)

@app.route('/works/js/<path:filename>')
@app.route('/en/works/js/<path:filename>')
def works_js_static(filename):
    return send_from_directory(app.root_path + '/works/js/', filename, conditional=True)

import re
import urllib.request

def get_terms(lang):
    if lang == "en":
        lang = "?lang=en"
    else:
        lang = ""
    terms = ""
    with urllib.request.urlopen('https://axip-console.appspot.com/trial/terms/AILIA'+lang) as response:
        html = response.read().decode('utf-8')
        m = re.search(r'termsOfUse">([\S\s]*?)</',html)
        if m:
            terms = m.groups()[0]
        else:
            terms = "Term fetch failed"
    return terms

def get_request_url(lang):
    if lang == "en":
        lang = "?lang=en"
    else:
        lang = ""
    error_message = ""
    with urllib.request.urlopen('https://axip-console.appspot.com/trial/terms/AILIA'+lang) as response:
        html = response.read().decode('utf-8')
        m = re.search(r'action="(.*?)"',html)
        if m:
            request_url = m.groups()[0]
        else:
            error_message = "Request url not found"
    return request_url, error_message

def request_license(request_url, lang):
    error_message = ""
    name = request.form.get("name")
    company = request.form.get("company")
    mail = request.form.get("mail")
    news = request.form.get("news")

    if not name or not mail:
        if lang=="en":
            return "", "Your name and email address are required."
        else:
            return "", "氏名とメールアドレスは必須項目です。"

    if lang == "en":
        lang = "en"
    else:
        lang = "jp"

    values = {'name' : name,
            'company' : company,
            'mail' : mail,
            'news' : news,
            'lang' : lang}
    status_message = "Request url : "+request_url
    data = urllib.parse.urlencode(values)
    data = data.encode('ascii') # data should be bytes
    req = urllib.request.Request(request_url, data)
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        m = re.search(r'<p>(.*?)</p>',html)
        if m:
            if mail and (mail in m.groups()[0]):
                status_message = m.groups()[0]
                status_message = status_message.replace(mail,'<span class="mail">'+mail+'</span>')
            else:
                error_message = m.groups()[0]
        else:
            error_message = "Text not found"
    
    return status_message, error_message
    
def trial_page_core_get(lang):
    terms = get_terms(lang)
    host = "/"
    return render_template("trial/"+lang+"/index.html", host = host, terms = terms, lang = lang)

def trial_page_core_post(lang):
    error_message = ""
    status_message = ""
    request_url = ""

    request_url, error_message = get_request_url(lang)
    if request_url != "":
        status_message, error_message = request_license(request_url, lang)

    host = "/"

    return render_template("trial/"+lang+"/complete.html", host = host, status_message = status_message, error_message = error_message)

@app.route("/trial/", methods=["GET"])
def trial_page_ja_get():
    return trial_page_core_get("ja")

@app.route("/en/trial/", methods=["GET"])
def trial_page_en_get():
    return trial_page_core_get("en")

@app.route("/trial/", methods=["POST"])
def trial_page_ja_post():
    return trial_page_core_post("ja")

@app.route("/en/trial/", methods=["POST"])
def trial_page_en_post():
    return trial_page_core_post("en")

@app.route('/trial/images/<path:filename>')
@app.route('/en/trial/images/<path:filename>')
def trial_image_static(filename):
    return send_from_directory(app.root_path + '/trial/images/', filename, conditional=True)

@app.route('/trial/css/<path:filename>')
@app.route('/en/trial/css/<path:filename>')
def trial_css_static(filename):
    return send_from_directory(app.root_path + '/trial/css/', filename, conditional=True)

@app.route('/trial/js/<path:filename>')
@app.route('/en/trial/js/<path:filename>')
def trial_js_static(filename):
    return send_from_directory(app.root_path + '/trial/js/', filename, conditional=True)

@app.route("/ai-computing/", defaults={"foldername": "", "filename": "index.html"}, methods=["GET"])
@app.route("/ai-computing/<path:filename>", defaults={"foldername": ""}, methods=["GET"])
@app.route("/ai-computing/<path:foldername>/<path:filename>", methods=["GET"])
def compute_page(foldername, filename):
    if not (".html" in filename):
        foldername = filename
        filename = "index.html"
    if foldername != "":
        foldername = foldername + "/"
    return render_template("/ai-computing/"+foldername+filename)

@app.route('/ai-computing/img/<path:filename>')
def compute_image_static(filename):
    return send_from_directory(app.root_path + '/ai-computing/img/', filename, conditional=True)

@app.route('/ai-computing/css/<path:filename>')
def compute_css_static(filename):
    return send_from_directory(app.root_path + '/ai-computing/css/', filename, conditional=True)

@app.route('/ai-computing/js/<path:filename>')
def compute_js_static(filename):
    return send_from_directory(app.root_path + '/ai-computing/js/', filename, conditional=True)

@app.route("/company/", defaults={"foldername": "", "filename": "index.html"}, methods=["GET"])
@app.route("/en/company/", defaults={"foldername": "", "filename": "index_en.html"}, methods=["GET"])
def ccompany_page(foldername, filename):
    if not (".html" in filename):
        foldername = filename
        filename = "index.html"
    return render_template("/company/"+foldername+filename)

@app.route('/company/img/<path:filename>')
@app.route('/en/company/img/<path:filename>')
def company_image_static(filename):
    return send_from_directory(app.root_path + '/company/img/', filename, conditional=True)

@app.route('/company/style/<path:filename>')
@app.route('/en/company/style/<path:filename>')
def company_css_static(filename):
    return send_from_directory(app.root_path + '/company/style/', filename, conditional=True)

@app.route('/company/js/<path:filename>')
@app.route('/en/company/js/<path:filename>')
def company_js_static(filename):
    return send_from_directory(app.root_path + '/company/js/', filename, conditional=True)

@app.route("/qr", methods=["GET"])
def qr_redirect_page():
    return redirect("https://ailia.ai/?utm_source=business_card&utm_medium=referral&utm_campaign=qrcode_2507")

if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END gae_python37_app]
