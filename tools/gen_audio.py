import asyncio, json, os, sys, edge_tts
texts = json.load(open(sys.argv[1], encoding='utf-8')); out = sys.argv[2]; voice = sys.argv[3] if len(sys.argv) > 3 else 'ja-JP-NanamiNeural'
os.makedirs(out, exist_ok=True)
def fnv(s):  # FNV-1a over UTF-16 code units, same as aKey() in index.html
    h = 0x811c9dc5
    for u in s.encode('utf-16-le').hex() and [int.from_bytes(s.encode('utf-16-le')[i:i+2], 'little') for i in range(0, len(s.encode('utf-16-le')), 2)]:
        h ^= u; h = (h * 0x01000193) & 0xffffffff
    return format(h, '08x')
sem = asyncio.Semaphore(6); fails = []
async def one(t):
    f = os.path.join(out, fnv(t) + '.mp3')
    if os.path.exists(f) and os.path.getsize(f) > 0: return
    async with sem:
        for _ in range(3):
            try: await edge_tts.Communicate(t, voice).save(f); return
            except Exception as e: err = e; await asyncio.sleep(2)
        fails.append((t, str(err)))
async def main():
    await asyncio.gather(*(one(t) for t in texts))
    keys = sorted({fnv(t) for t in texts if os.path.exists(os.path.join(out, fnv(t) + '.mp3'))})
    json.dump(keys, open(os.path.join(out, 'list.json'), 'w'), separators=(',', ':'))
    print('ok', len(keys), 'fail', len(fails), fails[:3])
asyncio.run(main())
