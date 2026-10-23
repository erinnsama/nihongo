# 重新產生朗讀音檔

新增或修改題目後執行（需要 Edge、Node、`pip install edge-tts`）：

```
python -m http.server 8765            # 在 repo 根目錄另開一個視窗
node tools/collect-texts.mjs http://127.0.0.1:8765/index.html tools/collect-texts.js texts.json
python -X utf8 tools/gen_audio.py texts.json audio
```

已存在的音檔會跳過，只錄新的句子，並更新 `audio/list.json`。
