const KLAVIYO_API = 'https://a.klaviyo.com/api';

export async function subscribeToKlaviyo(email: string, source = 'site') {
  const key = process.env.KLAVIYO_PRIVATE_KEY;
  const listId = process.env.KLAVIYO_LIST_ID;
  if (!key || !listId) throw new Error('Klaviyo env missing');

  const res = await fetch(`${KLAVIYO_API}/profile-subscription-bulk-create-jobs/`, {
    method: 'POST',
    headers: {
      Authorization: `Klaviyo-API-Key ${key}`,
      'Content-Type': 'application/json',
      revision: '2024-07-15',
      accept: 'application/json',
    },
    body: JSON.stringify({
      data: {
        type: 'profile-subscription-bulk-create-job',
        attributes: {
          custom_source: source,
          profiles: { data: [{ type: 'profile', attributes: { email } }] },
        },
        relationships: { list: { data: { type: 'list', id: listId } } },
      },
    }),
  });

  if (!res.ok && res.status !== 202) {
    const txt = await res.text();
    throw new Error(`Klaviyo failed: ${res.status} ${txt}`);
  }
  return { ok: true };
}
