---
title: "Design for Driving — Writing Principles"
author: "Google for Developers — Android for Cars"
source_url: "https://developers.google.com/cars/design/design-foundations/writing-principles"
copy_kind: "fulltext"
license: "CC-BY-4.0"
reviewed_on: "2026-11-01"
---

# Design for Driving — Writing Principles

> 正文 Markdown。正文按所列许可转换为 Markdown；删除网站导航和广告，保留正文及链接，未翻译。图片/视频为远程链接，不是完整离线媒体包。

作者／机构：Google for Developers — Android for Cars。

[原文](https://developers.google.com/cars/design/design-foundations/writing-principles) · [许可依据](https://developers.google.com/cars/design/design-foundations/writing-principles)

© Google。仅转换 Google Design for Driving 的 Writing principles 英文单页，保留四组车屏写作原则、驾驶与驻车区别及 Do/Don't 示例；不抓取整套 Android for Cars 设计指南。页面明确声明文本 CC BY 4.0、代码示例 Apache 2.0；图片、外部内容仅保留链接，不构成离线媒体包。Markdown 格式转换由 awesome-ai-taste 完成，不代表 Google 背书。该指南面向 Android for Cars 的车载界面，尤其驾驶过程中可扫读的文案，不等同于整车功能安全、道路法规或人机工程合规认证；英文和日文的具体字数上限不可直接机械套用到中文。许可：https://creativecommons.org/licenses/by/4.0/ 。

---

Text on the car screen must be glanceable, consistent, clear, and oriented towards the driver's situation.

This section describes how you can:

- [Make content glanceable](https://developers.google.com/cars/design/design-foundations/writing-principles#glanceable)
- [Use consistent language](https://developers.google.com/cars/design/design-foundations/writing-principles#consistent)
- [Write with situational awareness](https://developers.google.com/cars/design/design-foundations/writing-principles#situational)
- [Follow best practices for writing component text](https://developers.google.com/cars/design/design-foundations/writing-principles#best-practices)

## Make content glanceable

Simple, glanceable content ensures that the driver's attention returns quickly to the road.

You should:

- [Use scannable content patterns](https://developers.google.com/cars/design/design-foundations/writing-principles#scannable)
- [Use simpler, direct language](https://developers.google.com/cars/design/design-foundations/writing-principles#simple-language)
- [Limit text to 120 characters](https://developers.google.com/cars/design/design-foundations/writing-principles#limit-text)

### Use scannable content patterns

While both driving and parked, the goal is to reduce the driver's cognitive load. People don't read what's on the screen; instead they scan the text in an F-shaped pattern.

Front-load important information, clearly and concisely describing the action the user needs to perform. Use clear hierarchy to convey information at a glance. For example, use bullet points to organize content.

| Do | Don't |
| --- | --- |
| **Connect your phone to start** To get started, do one of the following: - Tap the notification on your phone - Scan the QR code | **Connect your phone to start** Tap the on the notification on your phone or scan the QR code to get started. You will then be guided to your car's app to complete next steps. |

### Use direct language

Avoid using jargon or complex words. They confuse the user and delay task completion.

| Do | Don't |
| --- | --- |
| Sign in to your account | Authenticate your account |

### Limit text to 120 characters

Limiting the amount of text the driver has to read before taking action reduces cognitive load and increases comprehension. Based on guidance from NHTSA and JAMA:

- A single message or chunk of text in English shouldn't exceed 120 characters or 24 words
- A single message or chunk of text in Japanese shouldn't exceed 30 characters
- The text in 1 line shouldn't exceed 80 characters
- A sentence or paragraph shouldn't span more than 3 lines of text

This guidance doesn't apply to legal or privacy text.

| Do | Don't |
| --- | --- |
| **Android Auto doesn't work with your phone** Android Auto isn't part of your phone's operating system, so it won't work with this car. **OK** | **Android Auto was not preinstalled on this device** Android Auto must be bundled with your operating system to work correctly. Please contact your phone manufacturer for assistance. **Try Again** |

## Use consistent language

Consistent language helps minimize cognitive load for drivers.

You should:

- [Be consistent in your writing style](https://developers.google.com/cars/design/design-foundations/writing-principles#consistent-writing)
- [Unify terminology](https://developers.google.com/cars/design/design-foundations/writing-principles#terminology)

### Be consistent in your writing style

Consistency creates a cohesive and recognizable voice for your brand. It helps drivers navigate the text seamlessly and builds trust and loyalty over time.

Based on your brand's style choices, ensure consistency in choice of words, sentence structure, capitalization, punctuation, and overall voice and tone.

| Do | Don't |
| --- | --- |
| ***Make buttons sentence case or title case consistently*** Cancel setup Connect another phone | ***Mix capitalization across buttons*** Cancel Setup Connect another device |
| ***Punctuate the end of standalone sentences consistently: period or no period*** "Your phone is now connected to the car" and "You lost connection with your phone" | ***Mix use of periods across sentences*** "Your phone is now connected to the car." and "You lost connection with your phone" |

### Unify terminology

Using different words to mean the same thing confuses users. Use consistent terminology across your product to remove ambiguity during user journeys, enhance user comprehension, and increase user trust.

| Do | Don't |
| --- | --- |
| **First reference**: Phone **Second reference**: Connect another phone | **First reference**: Mobile device **Second reference**: Connect another phone |

## Write with situational awareness

Ensure language on the UI is relevant to the user's needs and situation, including whether they are driving, parked, or experiencing an emergency.

You should:

- [Balance brevity with clarity](https://developers.google.com/cars/design/design-foundations/writing-principles#brevity-clarity)
- [Lead with benefit to the user](https://developers.google.com/cars/design/design-foundations/writing-principles#lead-with-benefits)
- [Use reassuring tone of voice, except in emergency](https://developers.google.com/cars/design/design-foundations/writing-principles#tone)

### Balance brevity with clarity

The text shown during driving should be brief and clear. However, it's OK to use longer explanations for complex situations — such as privacy consents, permissions, and data sharing — when the driver is parked. In those instances, break up longer text using lists and hierarchy to keep text readable.

| Do | Don't |
| --- | --- |
| **Chromecast built-in** To use Chromecast built-in, you'll need to agree to Google's Terms of Service and Google's Privacy Policy. Your device data ensures Chromecast built-in works as expected, and won't be used to identify you. [I agree] [Not now] | **Chromecast Terms of Service** You must agree to Google's Terms of Service and Google's Privacy Policy. Your device data won't be used to identify you. [OK] [Cancel] |

### Lead with benefit to the user

By starting with the value a feature offers, you can prioritize the importance of the user's needs, reduce cognitive load, and help them make a decision to move forward in a short span of time.

| Do | Don't |
| --- | --- |
| To connect your phone, turn on Bluetooth | Use Bluetooth to connect your phone |
| To sign in faster, scan the QR code | Scan the QR code to connect faster |

### Use reassuring tone of voice, except in emergency

When the car is in motion, use a reassuring tone of voice to avoid distracting the driver and causing needless anxiety.

However, exceptions should be made when the driver is in physical danger and needs to take immediate action. In those cases, use direct instruction and exclamation marks to convey urgency.

| Do | Don't |
| --- | --- |
| (Non emergency) New conversations are paused | (Non emergency) For your safety, all new conversations are paused! |
| (Non emergency) Android Auto lost connection | (Non emergency) Lost connection! |
| (Emergency) Brake now! | (Emergency) Take control of your steering wheel to stop collision |

## Follow best practices for writing component text

These best practices are always relevant but especially so for car screens.

You should:

- [Make button text brief and actionable](https://developers.google.com/cars/design/design-foundations/writing-principles#button-text)
- [Provide confirmation messages](https://developers.google.com/cars/design/design-foundations/writing-principles#confirmation)
- [Provide recovery from errors](https://developers.google.com/cars/design/design-foundations/writing-principles#error-recovery)
- [Front-load critical information in notifications](https://developers.google.com/cars/design/design-foundations/writing-principles#critical-info)

### Make button text brief and actionable

Button labels, also known as CTAs (calls to action), should always start with a verb and ideally contain no more than 3 words.

| Do | Don't |
| --- | --- |
| Connect phone | Phone is ready |
| Download app | App listing |

### Provide confirmation messages

Provide a confirmation message to reassure users when tasks they initiated have been completed.

| Do | Don't |
| --- | --- |
| Dave's phone is now connected to the car's hotspot | &lt;No confirmation message&gt; |

### Provide recovery from errors

Error messages should state the problem clearly and offer a way out of the situation. If there's no recovery path, the message should be transparent about it with the user.

| Do | Don't |
| --- | --- |
| **Turn on Wi-Fi to connect** Android Auto needs 5 GHz Wi-Fi support to connect [Turn on Wi-Fi] [Not now] | **Android Auto is not connected** Your Wi-Fi is turned off [OK] |
| **Try a new USB cable** Your phone keeps disconnecting from the car. Using a different USB cable or port could help. | **Damaged USB cable detected** Android Auto has noticed an unusual number of disconnections. |

### Front-load critical information in notifications

Notifications should succinctly front-load critical information. [Avoid causing alarm to the driver in any way](https://developers.google.com/cars/design/design-foundations/writing-principles#tone).

| Do | Don't |
| --- | --- |
| **Focus on driving** Some new notifications are saved in the Notification Center | **Notifications aren't being shown** Go to the Notification Center to see your notifications |
