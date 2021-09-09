FROM fusuf/whatsasena:latest

RUN git clone https://github.com/DARKCRIME1/hiruwa /root/hiruwa
WORKDIR /root/hiruwa/
ENV TZ=Asia/Kolkata
RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
