import {expect} from 'chai';
import m from 'mocha';

import RPSModule from '../src/index';
import { RpsContext } from 'rpscript-interface';

m.describe('botmaster', () => {

  m.it('should receive message', async function () {
    let ctx = new RpsContext();
    ctx.addModuleContext('botmaster',{});

    let md = new RPSModule(ctx);

    //TODO: add platform
    // md.setup(ctx);

    let output = await md.receiveMsg(new RpsContext,{} ,function (bot,update) {
      console.log('hi');
    });
    
    // expect(output).to.be.equals('<p>Hello <em>World</em>!</p>');

  }).timeout(0);

})
