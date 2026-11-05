import assert from 'node:assert/strict';
import { websiteEvent } from '../src/lib/website-events.ts';
for(const consent of [undefined,null,'unknown','declined','withdrawn',true]) assert.equal(websiteEvent({event:'booking_click',location:'kingsport'},consent),null);
for(const location of ['kingsport','jonesborough']) for(const event of ['booking_click','phone_click','sms_click']) assert.deepEqual(websiteEvent({event,location},'granted'),{schemaVersion:1,event,location});
for(const extra of ['email','phone','sessionId','page','referrer','url','treatment','utm_campaign','patientId']) assert.equal(websiteEvent({event:'booking_click',location:'kingsport',[extra]:'private'},'granted'),null);
for(const event of ['confirmed_booking','attended_visit','collected_revenue','inquiry','lead','demo_booking']) assert.equal(websiteEvent({event,location:'kingsport'},'granted'),null);
assert.equal(websiteEvent({event:'booking_click',location:'unknown'},'granted'),null);
assert.equal(websiteEvent({event:'booking_click',location:'kingsport'},'withdrawn'),null);
console.log('PASS event allowlist, both locations, default/decline/withdrawal, PII boundaries, no false outcomes');
