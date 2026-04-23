type UnlockEmailVars = {
  first_name?: string
  vibe_score: number | string
  diagnosis: string
  better_reply_1: string
  better_reply_2: string
}

const subjectOptions = [
  '{{first_name}}, your text scored {{vibe_score}}. Here is what that means.',
  'Your {{vibe_score}} vibe score decoded in 30 seconds',
  'Why your text got a {{vibe_score}} and the 2 replies that work better',
]

export function renderUnlockEmail(vars: UnlockEmailVars) {
  const firstName = vars.first_name?.trim() ? vars.first_name.trim() : 'your text'

  const subject = subjectOptions[0]
    .replace('{{first_name}}', firstName)
    .replace('{{vibe_score}}', String(vars.vibe_score))

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f6f7fb;font-family:Arial,Helvetica,sans-serif;color:#111111;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f7fb;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="padding:24px 22px 10px 22px;font-size:22px;line-height:1.3;font-weight:700;color:#111111;">Your VibeScan breakdown is ready</td>
            </tr>
            <tr>
              <td style="padding:0 22px 18px 22px;font-size:16px;line-height:1.55;color:#202124;">${firstName}, your text scored <strong>${vars.vibe_score}/100</strong>. In plain English: <strong>${vars.diagnosis}</strong></td>
            </tr>
            <tr>
              <td style="padding:0 22px 16px 22px;font-size:15px;line-height:1.65;color:#202124;"><strong>What you sent</strong><br>The message likely sounds lower-effort than you meant, so your intent is not fully landing.</td>
            </tr>
            <tr>
              <td style="padding:0 22px 16px 22px;font-size:15px;line-height:1.65;color:#202124;"><strong>How it reads</strong><br>It can come off as unsure or dry. That creates friction, even if they like you.</td>
            </tr>
            <tr>
              <td style="padding:0 22px 10px 22px;font-size:15px;line-height:1.65;color:#202124;"><strong>What to send instead</strong><br>Use one of these copy-paste replies:</td>
            </tr>
            <tr>
              <td style="padding:0 22px 10px 22px;"><div style="background:#f2f5ff;border:1px solid #dbe4ff;border-radius:10px;padding:12px;font-size:15px;line-height:1.55;color:#111111;">${vars.better_reply_1}</div></td>
            </tr>
            <tr>
              <td style="padding:0 22px 20px 22px;"><div style="background:#f2f5ff;border:1px solid #dbe4ff;border-radius:10px;padding:12px;font-size:15px;line-height:1.55;color:#111111;">${vars.better_reply_2}</div></td>
            </tr>
            <tr>
              <td style="padding:0 22px 8px 22px;font-size:15px;line-height:1.65;color:#202124;">This is for one message.</td>
            </tr>
            <tr>
              <td style="padding:0 22px 8px 22px;font-size:15px;line-height:1.65;color:#202124;">VibeScan Pro watches your whole conversation and warns you before you double text or sound dry.</td>
            </tr>
            <tr>
              <td style="padding:0 22px 8px 22px;font-size:15px;line-height:1.65;color:#202124;">You get live tone checks, timing nudges, and better reply rewrites as the chat unfolds.</td>
            </tr>
            <tr>
              <td style="padding:6px 22px 22px 22px;"><a href="https://vibescan.ai/pro" style="display:inline-block;background:#111111;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:12px 18px;border-radius:10px;">Analyze unlimited messages for $3</a></td>
            </tr>
            <tr>
              <td style="padding:0 22px 24px 22px;font-size:13px;line-height:1.6;color:#5f6368;">PS: Real tip for tonight. Match their text length for your next reply, then ask one specific question. It keeps the conversation balanced and easier to answer.</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

  const text = `Your VibeScan breakdown is ready

${firstName}, your text scored ${vars.vibe_score}/100.
In plain English: ${vars.diagnosis}

What you sent:
The message likely sounds lower-effort than you meant, so your intent is not fully landing.

How it reads:
It can come off as unsure or dry. That creates friction, even if they like you.

What to send instead:
1) ${vars.better_reply_1}
2) ${vars.better_reply_2}

This is for one message.
VibeScan Pro watches your whole conversation and warns you before you double text or sound dry.
You get live tone checks, timing nudges, and better reply rewrites as the chat unfolds.

Analyze unlimited messages for $3:
https://vibescan.ai/pro

PS: Real tip for tonight. Match their text length for your next reply, then ask one specific question. It keeps the conversation balanced and easier to answer.`

  return { subject, html, text, subjectOptions }
}
