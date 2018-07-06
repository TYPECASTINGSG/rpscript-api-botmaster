/**
 * @module botmaster
 */

import Botmaster from 'botmaster';
import {RpsContext,RpsModule,rpsAction} from 'rpscript-interface';

let MOD_ID = "botmaster"

export interface ModuleContext {
  botmaster?:any;
}

@RpsModule(MOD_ID)
export default class RPSModule {

  constructor(ctx:RpsContext){
    ctx.addModuleContext(MOD_ID,{ 'botmaster' : new Botmaster()});
  }

  //lifecycle: called after all modules loaded
  setup (ctx:RpsContext) {
    let myCtx = ctx.getModuleContext(MOD_ID)['botmaster'];
    let platforms:Object[] = ctx.getModuleContextStartWith('botmaster-');
    
    platforms.forEach(platform => myCtx.addBot(platform['botmaster']) );
  }

  @rpsAction({verbName:'receive-botmaster-message'})
  async receiveMsg (ctx:RpsContext,opts:Object, controller:(bot,update)=>void) : Promise<void>{
    
    let botmaster = ctx.getModuleContext(MOD_ID)['botmaster'];

    botmaster.use({
      type: 'incoming', name: 'some-middleware',controller: controller
    });
  }

}
