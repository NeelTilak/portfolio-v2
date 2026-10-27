#!/usr/bin/env python3
"""
Custom Portfolio Server with Gmail SMTP Query Handler, Anti-DDoS Rate Limiting, and CAPTCHA Verification
Serves static assets and securely processes contact queries via Gmail SMTP (Port 587 STARTTLS)
"""

import http.server
import socketserver
import json
import urllib.parse
import smtplib
import hmac
import hashlib
import time
import random
import string
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import os
import sys

PORT = 8080
CONFIG_PATH = os.path.join(os.path.dirname(__file__), 'config', 'email.json')
SECRET_KEY = b"neel-tilak-anti-ddos-sec-token-2026-v1"

# Rate Limiting configuration: Max 3 requests per IP per 5 minutes
RATE_LIMIT_WINDOW = 300 # seconds
MAX_REQUESTS_PER_WINDOW = 3
ip_history = {} # ip -> list of timestamps

def is_rate_limited(client_ip):
    now = time.time()
    if client_ip not in ip_history:
        ip_history[client_ip] = []
    
    # Filter out requests older than window
    ip_history[client_ip] = [t for t in ip_history[client_ip] if now - t < RATE_LIMIT_WINDOW]
    
    if len(ip_history[client_ip]) >= MAX_REQUESTS_PER_WINDOW:
        return True
    
    ip_history[client_ip].append(now)
    return False

def generate_captcha():
    # 6 alphanumeric characters without ambiguous chars (0, O, 1, I)
    chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"
    code = "".join(random.choices(chars, k=6))
    timestamp = str(int(time.time()))
    signature = hmac.new(SECRET_KEY, f"{code.upper()}:{timestamp}".encode('utf-8'), hashlib.sha256).hexdigest()
    token = f"{signature}:{timestamp}"
    return code, token

def verify_captcha(user_code, token):
    if not user_code or not token or ":" not in token:
        return False, "Missing or malformed security token."
    
    sig, ts_str = token.split(":", 1)
    try:
        ts = int(ts_str)
    except ValueError:
        return False, "Invalid timestamp in security token."
    
    now = int(time.time())
    # Challenge must be at least 1.5 seconds old (anti-instant-bot) and no older than 10 minutes
    if now - ts > 600:
        return False, "Security verification code expired. Please refresh the code."
    if now - ts < 1:
        return False, "Submission completed too fast (suspected bot). Please retry."
    
    expected_sig = hmac.new(SECRET_KEY, f"{user_code.strip().upper()}:{ts_str}".encode('utf-8'), hashlib.sha256).hexdigest()
    if hmac.compare_digest(sig, expected_sig):
        return True, "Valid"
    return False, "Incorrect security code. Please verify the characters."

def load_email_settings():
    try:
        with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data.get('EmailSettings', {})
    except Exception as e:
        print(f"[WARN] Could not load {CONFIG_PATH}: {e}")
        return {
            "SmtpServer": "smtp.gmail.com",
            "SmtpPort": 587,
            "Username": "neeltilak23@gmail.com",
            "Password": "oapi iyrb yxjx cufo",
            "FromName": "Neel Tilak Portfolio",
            "FromEmail": "neeltilak23@gmail.com",
            "ToEmail": "neeltilak23@gmail.com"
        }

EMAIL_SETTINGS = load_email_settings()

def send_smtp_email(name, email, subject, message):
    smtp_server = EMAIL_SETTINGS.get("SmtpServer", "smtp.gmail.com")
    smtp_port = int(EMAIL_SETTINGS.get("SmtpPort", 587))
    username = EMAIL_SETTINGS.get("Username", "neeltilak23@gmail.com")
    password = EMAIL_SETTINGS.get("Password", "")
    from_name = EMAIL_SETTINGS.get("FromName", "Neel Tilak Portfolio")
    from_email = EMAIL_SETTINGS.get("FromEmail", "neeltilak23@gmail.com")
    to_email = EMAIL_SETTINGS.get("ToEmail", "neeltilak23@gmail.com")

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f"[Portfolio Query] {subject} — From {name}"
    msg['From'] = f"{from_name} <{from_email}>"
    msg['To'] = to_email
    msg['Reply-To'] = email
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S UTC")

    text_content = f"""
New Query Received via Portfolio Website (Anti-Bot Verified):

Sender Name:    {name}
Sender Email:   {email}
Subject:        {subject}
Timestamp:      {now_str}

Message:
{message}

---
Reply directly to this email to contact {name} at {email}.
    """.strip()

    html_content = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #080A0F; color: #E2E8F0; padding: 24px; }}
    .container {{ max-width: 600px; margin: 0 auto; background: #0E121B; border: 1px solid #1E293B; border-radius: 12px; overflow: hidden; }}
    .header {{ background: linear-gradient(135deg, #8B5CF6, #06B6D4); padding: 20px 24px; color: #ffffff; }}
    .header h2 {{ margin: 0; font-size: 1.25rem; font-weight: 600; }}
    .badge {{ display: inline-block; background: rgba(0,0,0,0.25); padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; margin-top: 6px; }}
    .content {{ padding: 24px; }}
    .meta-table {{ width: 100%; border-collapse: collapse; margin-bottom: 20px; }}
    .meta-table td {{ padding: 8px 12px; font-size: 0.9rem; border-bottom: 1px solid #1E293B; }}
    .meta-label {{ color: #94A3B8; font-weight: 600; width: 130px; }}
    .meta-val {{ color: #F1F5F9; }}
    .msg-box {{ background: #151B28; border-left: 4px solid #8B5CF6; padding: 16px; border-radius: 6px; font-size: 0.95rem; line-height: 1.6; color: #F8FAFC; white-space: pre-wrap; }}
    .footer {{ padding: 16px 24px; background: #0A0D14; font-size: 0.8rem; color: #64748B; text-align: center; border-top: 1px solid #1E293B; }}
    .btn {{ display: inline-block; background: #8B5CF6; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: 600; margin-top: 16px; }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🚀 New Verified Portfolio Query</h2>
      <span class="badge">🛡️ CAPTCHA &amp; DDoS Verified</span>
    </div>
    <div class="content">
      <table class="meta-table">
        <tr>
          <td class="meta-label">From:</td>
          <td class="meta-val"><strong>{name}</strong></td>
        </tr>
        <tr>
          <td class="meta-label">Email:</td>
          <td class="meta-val"><a href="mailto:{email}" style="color:#06B6D4;">{email}</a></td>
        </tr>
        <tr>
          <td class="meta-label">Subject:</td>
          <td class="meta-val">{subject}</td>
        </tr>
        <tr>
          <td class="meta-label">Received At:</td>
          <td class="meta-val">{now_str}</td>
        </tr>
      </table>

      <div style="font-size:0.85rem;font-weight:600;color:#94A3B8;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em;">Message Content:</div>
      <div class="msg-box">{message}</div>

      <div style="text-align:center;margin-top:20px;">
        <a href="mailto:{email}?subject=Re:%20{urllib.parse.quote(subject)}" class="btn">Reply Directly to {name}</a>
      </div>
    </div>
    <div class="footer">
      Dispatched via Neel Tilak Portfolio Server (Anti-Bot Protected)
    </div>
  </div>
</body>
</html>
    """.strip()

    msg.attach(MIMEText(text_content, 'plain'))
    msg.attach(MIMEText(html_content, 'html'))

    server = smtplib.SMTP(smtp_server, smtp_port, timeout=15)
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login(username, password)
    server.sendmail(from_email, [to_email], msg.as_string())
    server.quit()
    print(f"[SMTP] Successfully sent verified email from {email} to {to_email}")

class PortfolioRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.path == '/api/captcha':
            code, token = generate_captcha()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.end_headers()
            resp = json.dumps({'code': code, 'token': token})
            self.wfile.write(resp.encode('utf-8'))
            return
        
        super().do_GET()

    def do_POST(self):
        client_ip = self.client_address[0]

        if self.path in ['/api/contact', '/api/query']:
            try:
                # 1. DDoS Rate Limiting
                if is_rate_limited(client_ip):
                    print(f"[SECURITY] Rate limit triggered for IP: {client_ip}")
                    self.send_response(429)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    resp = json.dumps({
                        'success': False, 
                        'error': 'DDoS protection active: Rate limit exceeded. Maximum 3 queries allowed per 5 minutes.'
                    })
                    self.wfile.write(resp.encode('utf-8'))
                    return

                content_len = int(self.headers.get('Content-Length', 0))
                body = self.rfile.read(content_len).decode('utf-8')

                name = ''
                email = ''
                subject = 'Portfolio Query'
                message = ''
                captcha_input = ''
                captcha_token = ''
                bot_field = ''

                content_type = self.headers.get('Content-Type', '')
                if 'application/json' in content_type:
                    data = json.loads(body)
                    name = data.get('name', '').strip()
                    email = data.get('email', '').strip()
                    subject = data.get('subject', 'Portfolio Query').strip()
                    message = data.get('message', '').strip()
                    captcha_input = data.get('captcha_input', '').strip()
                    captcha_token = data.get('captcha_token', '').strip()
                    bot_field = data.get('bot_field', '').strip()
                else:
                    parsed = urllib.parse.parse_qs(body)
                    name = parsed.get('name', [''])[0].strip()
                    email = parsed.get('email', [''])[0].strip()
                    subject = parsed.get('subject', ['Portfolio Query'])[0].strip()
                    message = parsed.get('message', [''])[0].strip()
                    captcha_input = parsed.get('captcha_input', [''])[0].strip()
                    captcha_token = parsed.get('captcha_token', [''])[0].strip()
                    bot_field = parsed.get('bot-field', [''])[0].strip()

                # 2. Honeypot check (Silent reject for scrapers)
                if bot_field:
                    print(f"[SECURITY] Honeypot triggered by {client_ip}. Dropping silently.")
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'success': True, 'message': 'Transmission received.'}).encode('utf-8'))
                    return

                # 3. Required Fields
                if not name or not email or not message:
                    self.send_response(400)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    resp = json.dumps({'success': False, 'error': 'Name, email, and message are required.'})
                    self.wfile.write(resp.encode('utf-8'))
                    return

                # 4. CAPTCHA Cryptographic Verification
                valid_captcha, err_reason = verify_captcha(captcha_input, captcha_token)
                if not valid_captcha:
                    print(f"[SECURITY] CAPTCHA failed for {client_ip}: {err_reason}")
                    self.send_response(400)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    resp = json.dumps({'success': False, 'error': f'Security verification failed: {err_reason}'})
                    self.wfile.write(resp.encode('utf-8'))
                    return

                # 5. Send email via Gmail SMTP
                send_smtp_email(name, email, subject, message)

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                resp = json.dumps({
                    'success': True,
                    'message': 'Transmission received! Your query has been delivered directly to Neel Tilak.'
                })
                self.wfile.write(resp.encode('utf-8'))

            except Exception as e:
                print(f"[ERROR] Contact form submission failed: {e}")
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                resp = json.dumps({'success': False, 'error': f'Transmission dispatch failed: {str(e)}'})
                self.wfile.write(resp.encode('utf-8'))
        else:
            super().do_POST()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else PORT
    handler = PortfolioRequestHandler
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", port), handler) as httpd:
        print(f"Portfolio HTTP, SMTP & Anti-DDoS Server running at http://localhost:{port}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
            httpd.server_close()
