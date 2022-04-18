<!--
 * @Description: 实名认证声明
 * @Autor: siwenfeng
 * @Date: 2021-11-30 14:26:43
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-30 17:15:24
-->
<template>
  <u-popup
    safe-area-inset-bottom
    mode="bottom"
    border-radius="28"
    v-model="showModal"
    :closeable="false"
    height="80%"
    :mask-close-able="false"
  >
    <view class="f-confirm-content">
      <view class="f-content-title u-m-b-32">实名认证服务确认申明</view>
      <view class="f-content-text">
        【深圳惠融资产管理有限公司】小程序非常重视保护您的隐私。
      </view>
      <view class="f-content-text f-font-indent">
        为方便您登录、使用相关服务，以及为您提供更个性化的用户体验和服务，您在使用我们的服务时，我们可能会收集和使用您的相关信息。我们希望通过本隐私政策向您说明，在使用【深圳惠融资产管理有限公司】   小程序（以下简称“小程序”）时，我们如何收集、使用、储存和披露您的信息，以及我们为您提供的访问、更新、控制和保护这些信息的方式。<text class="f-font-bold">本隐私政策与您所使用的小程序信息及个人隐私信息相关，希望您仔细阅读。</text>
      </view>
      <view class="f-content-text f-font-indent f-font-bold">
        您阅读并同意本隐私政策后，即意味着您已经同意我们按照本隐私政策收集、使用、储存和披露您的相关信息，以及向您提供的控制和保护措施。
      </view>
      <view class="f-content-text f-font-indent f-font-bold">
        一、使用范围
      </view>
      <view class="f-content-text f-font-indent">
        1.1本隐私政策适用于小程序的所有服务，服务包括向您提供页面浏览、网站登录服务，以及通过小程序向您提供的技术服务等。
      </view>
      <view class="f-content-text f-font-indent">
        1.2本隐私政策中的“信息”特指第二条所收集的信息。
      </view>
      <view class="f-content-text f-font-indent f-font-bold">
        二、信息收集范围
      </view>
      <view class="f-content-text f-font-indent">
       2.1为完成小程序账户的注册、管理、实名认证等必要活动<text class="f-font-bold">，您需要提交真实、合法、有效的信息，包括但不限于您的姓名、身份证号码、身份证有效期、联系电话、人脸生物信息、微信昵称、头像等。</text>
      </view>
      <view class="f-content-text f-font-indent">
        2.2您使用本服务时，可能收集已经经过您授权获取或主动填写的如下信息：
      </view>
      <view class="f-content-text f-font-indent">
        2.2.1日志信息，指您使用我们的服务时，系统可能通过自动采集的技术信息，包括：（1）设备或软件信息，例如您的移动设备、网页浏览器或用于接入我们服务的其他程序所提供的配置信息、您的IP 地址和移动设备所用的版本和设备识别码。（2）有关您曾使用的移动应用和其他软件的信息，以及您曾经使用该等移动应用和软件的信息。（3）您通过我们的服务进行通讯的信息，例如曾通讯的账号。
      </view>
      <view class="f-content-text f-font-indent">
        2.2.2位置信息，指您开启设备定位功能并使用我们基于位置提供的相关服务。
      </view>
      <view class="f-content-text f-font-indent f-font-bold">
        2.2.3您使用部分功能或服务时还应当提供使用该功能或服务所必须的信息，如在风险测评过程中，可能会根据您的答案提取到您受教育程度、收入情况、理财经验等相关信息，在音频视频录制过程中，我们将会保存您的录音录像信息。
      </view>
      <view class="f-content-text f-font-indent f-font-bold">
        三、如何收集信息
      </view>
      <view class="f-content-text f-font-indent">
        3.1我们通过您主动提交，以及在您使用我们的服务过程中产生相应的记录等方式收集您的信息。
      </view>
      <view class="f-content-text f-font-indent">
        3.2 我们可能会通过数据埋点和其他相关技术收集和使用您的信息。我们使用数据埋点的具体用途包括：分析您使用我们服务的情况，以便为您提供周到的个性化服务，包括定制化页面、推荐等服务。
      </view>
      <view class="f-content-text f-font-indent">
        3.3 通过小程序数据埋点记录的有关信息，将适用本隐私政策。
      </view>
      <view class="f-content-text f-font-indent f-font-bold">
        四、信息使用
      </view>
      <view class="f-content-text f-font-indent">
        4.1为了向您提供更加优质、便捷、安全的服务，在符合相关法律法规的前提下<text class="f-font-bold">，我们可能将收集的信息用作以下用途：</text>
      </view>
      <view class="f-content-text f-font-indent">
        （1）向您提供服务（如实名认证信息、用来接收验证码的手机号，是继续获得服务的前提）。
      </view>
      <view class="f-content-text f-font-indent">
        （2）满足您的个性化需求。例如，个性化的帮助服务和提示，对您和其他用户作出其他方面的回应。
      </view>
      <view class="f-content-text f-font-indent">
        （3）服务优化和开发。例如，我们会根据小程序系统响应您的需求时产生的信息，优化我们的服务。
      </view>
      <view class="f-content-text f-font-indent">
        （4）保护您或其他用户或公众的人身财产安全免遭侵害，更好地预防钓鱼网站、欺诈、网络漏洞、计算机病毒、网络攻击、网络侵入等安全风险，更准确地识别违反法律法规或小程序相关协议、规则的情况，我们可能使用您的账号信息、并整合设备信息、有关网络日志、安全事件的检测及防范，并依法采取必要的记录、审计、分析、处置措施。例如，我们会将您的信息用于身份验证、安全防范、投诉处理、纠纷协调、诈骗监测等用途。您在使用安全功能或其他类似服务时，我们会对恶意程序或病毒进行检测，或为您识别诈骗信息。
      </view>
      <view class="f-content-text f-font-indent">
        （5）向您提供与您更加相关的服务。例如，向您提供您可能感兴趣的类似功能或服务等。
      </view>
      <view class="f-content-text f-font-indent">
        （6）邀请您参与有关我们产品和服务的调查。
      </view>
      <view class="f-content-text f-font-indent">
        （7）其他可能需要使用收集的信息的相关场景，如果使用场景与初始场景无合理的关联性，我们会在使用信息前重新征得您的同意。
      </view>
      <view class="f-content-text f-font-indent f-font-bold">
        五、信息共享、转让、披露
      </view>
      <view class="f-content-text f-font-indent f-font-bold">
        5.1共享
      </view>
      <view class="f-content-text f-font-indent">
        我们不会与其他组织和个人共享您的用户信息，但以下情况除外：
      </view>
      <view class="f-content-text f-font-indent">
        5.1.1在获取明确同意的情况下共享：获得您的明确同意后，我们会与其他方共享您的用户信息；
      </view>
      <view class="f-content-text f-font-indent">
        5.1.2在法定情形下的共享:我们可能会根据法律法规规定、诉讼、仲裁解决需要，按照行政、司法机关依法提出的要求，对外共享您的用户信息；
      </view>
      <view class="f-content-text f-font-indent">
        5.1.3为了促成办理服务或协助解决争议，某些情况下只有共享您的用户信息，才能促成办理或处理您与他人的纠纷或争议。
      </view>
      <view class="f-content-text f-font-indent">
        5.1.4 与授权合作伙伴共享：我们可能委托受信赖的合作伙伴来提供服务（如人脸识别服务），因此我们可能会与合作伙伴共享提供服务所必要的用户信息，以提供更好的客户服务和优化用户体验。<text class="f-font-bold">我们仅会出于合法、正当、必要、特定、明确的目的共享您的用户信息，并且只会共享提供服务所必须的用户信息。我们的合作伙伴无权将共享的用户信息用于任何其他用途。</text>
      </view>
      <view class="f-content-text f-font-indent">
       目前，我们的授权合作伙伴包括如下类型：供应商、服务提供商和其他合作伙伴。我们将信息发送给支持我们业务的供应商、服务提供商和其他合作伙伴，这些支持包括提供基础技术服务、提供实名认证、咨询等专业服务。
      </view>
      <view class="f-content-text f-font-indent">
      对我们与之共享用户信息的公司、组织和个人，我们会与其签署严格的保密协议以及信息保护约定，要求他们按照我们的说明、本隐私政策以及其他任何相关的保密和安全措施来处理用户信息。
      </view>
      <view class="f-content-text f-font-indent f-font-bold">
        5.2转让
      </view>
      <view class="f-content-text f-font-indent">
        我们不会将您的用户信息转让给任何公司、组织和个人，但以下情况除外：
      </view>
      <view class="f-content-text f-font-indent">
        5.2.1在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的用户信息。
      </view>
      <view class="f-content-text f-font-indent f-font-bold">
        5.3披露
      </view>
      <view class="f-content-text f-font-indent">
        未经您同意，我们不会与任何无关第三方分享您的信息，以下情形除外：
      </view>
      <view class="f-content-text f-font-indent">
        5.3.1我们可能将您的信息与我们的关联公司、第三方服务提供商、承包商及代理商分享，仅用作：提供“二、信息收集范围”中相应功能或服务所必需，以及出于“四、信息使用”中部分所述目的所必需。
      </view>
      <view class="f-content-text f-font-indent f-font-bold">
        如我们与任何上述第三方分享您的信息，我们将努力确保第三方在使用您的信息时遵守本声明及我们要求其遵守的其他适当的保密和安全措施。
      </view>
      <view class="f-content-text f-font-indent">
        5.3.2随着我们业务的持续发展，我们以及我们的关联公司有可能进行合并、收购、资产重组或类似的交易，您的信息有可能作为此类交易的一部分而被转移。我们将遵守相关法律法规的要求，在转移前通知您，确保信息在转移时的机密性，以及变更后继续履行相应责任和义务。
      </view>
      <view class="f-content-text f-font-indent">
        5.3.3我们还可能因以下原因而披露您的信息：（1）遵守适用的法律法规等有关规定；（2）遵守法院判决、裁定或其他法律程序的规定；（3）遵守相关政府机关或其他有权机关的要求；（3）我们有理由确信需遵守法律法规等有关规定；（4）为执行相关服务协议或本隐私政策、维护社会公共利益、处理投诉/纠纷，保护我们的客户、我们或我们的关联公司、其他用户或雇员的人身和财产安全或合法权益所合理必需的用途；（5）经过您合法授权的情形。
      </view>
      <view class="f-content-text f-font-indent">
        如我们因上述原因而披露您的信息，我们将在遵守法律法规相关规定及本政策的基础上及时告知您。
      </view>
      <view class="f-content-text f-font-indent f-font-bold">
        六、信息存储
      </view>
      <view class="f-content-text f-font-indent">
        6.1 小程序收集的有关您的信息保存在本公司位于中国大陆的服务器。
      </view>
      <view class="f-content-text f-font-indent f-font-bold">
        七、信息安全
      </view>
      <view class="f-content-text f-font-indent">
        7.1我们努力保障信息安全，以防信息的丢失、不当使用、未经授权阅览或披露。
      </view>
      <view class="f-content-text f-font-indent">
        我们使用各种安全技术以保障信息的安全。例如，我们将通过服务器备份、密码加密等安全措施，防止信息泄露、损毁、丢失。
      </view>
      <view class="f-content-text f-font-indent">
        我们建立严格的管理制度和流程以保障信息的安全。例如，我们严格限制访问信息的人员范围，并进行审计，要求他们遵守保密义务。
      </view>
      <view class="f-content-text f-font-indent">
        我们重视信息安全合规工作，并通过安全认证，以业界先进的解决方案充分保障您的信息安全。
      </view>
      <view class="f-content-text f-font-indent">
        但请您理解，由于技术的限制以及可能存在的各种恶意手段，在互联网环境下，即便竭尽所能加强安全措施，也不可能始终保证信息百分之百的安全。您需要了解，您接入我们的服务所用的系统和通讯网络，有可能因我们可控范围外的因素而出现问题。
      </view>
      <view class="f-content-text f-font-indent f-font-bold">
        若发生个人信息泄露等安全事件，我们会启动应急预案，阻止安全事件扩大，并以发送邮件、推送通知、公告等形式告知您相关情况，并向您给出安全建议。
      </view>
      <view class="f-content-text f-font-indent">
        7.2为更有效的保障您的信息安全，我们也希望您能够加强自我保护意识。<text class="f-font-bold">我们仅在本小程序直接导致您个人信息泄露的范围内承担责任，因此，请您妥善保管您的账号及密码信息，避免您的个人信息泄露。</text>小程序账户及微信账户均有安全保护功能<text class="f-font-bold">，但您也需要妥善保护自己的个人信息，除非您判断认为必要的情形下，不向任何第三人提供您的账号密码等个人信息。</text>
      </view>
      <view class="f-content-text f-font-indent f-font-bold">
        八、访问与控制
      </view>
      <view class="f-content-text f-font-indent">
        8.1您可以在使用我们服务的过程中，访问、修改和删除您的相关信息。您访问、修改和删除信息的方式将取决于您使用的具体服务。
      </view>
      <view class="f-content-text f-font-indent">
        8.2如您发现我们违反法律法规的规定或者双方的约定收集、使用您的信息，您可以要求我们删除。如您发现我们收集、存储的您的信息有错误的，且无法自行更正的，您也可以要求我们更正。
      </view>
      <view class="f-content-text f-font-indent">
        8.3在访问、修改和删除相关信息时，我们可能会要求您进行身份验证，以保障账户安全。请您理解，由于技术所限、基于法律法规要求，您的某些请求可能无法响应。
      </view>
      <view class="f-content-text f-font-indent">
        8.4基于法律法规要求、保障信息安全等正当事由，您的部分信息可能无法访问、修改和删除
      </view>
      <view class="f-content-text f-font-indent">
        8.5如您对上述权利实现存在疑问，可以根据“十、与我们联系”中的相关联系方式与我们取得联系。
      </view>
      <view class="f-content-text f-font-indent f-font-bold">
        九、隐私政策的更新
      </view>
      <view class="f-content-text f-font-indent">
        我们可能适时修订本隐私政策的条款，该等修订构成本《隐私政策》的一部分。如可能造成您在本隐私政策下的权利的实质性减少或扩大收集、使用信息的范围等重要规则变更时，我们将在修订生效前通过主页上显著位置弹窗提示或向您发送电子邮件或以其它方式通知您。在该种情形况下<text class="f-font-bold">，若您继续使用我们的服务，即表示同意受修订的本隐私政策的约束。</text>
      </view>
      <view class="f-content-text f-font-indent f-font-bold">
        十、与我们联系
      </view>
      <view class="f-content-text f-font-indent">
        如您对本政策或其他相关事宜有疑问 <text class="f-font-bold">，您可以通过小程序公布的联系方式进行咨询或根据我们提供的指引，</text>填写意见反馈。我们将尽快审核所涉问题，并在验证您的用户身份后予以回复。
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.f-confirm-content {
  padding: 48rpx 40rpx;
  padding-bottom: 180rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  .f-content-title {
    text-align: center;
    font-size: $font-xxl;
    font-weight: 700;
    // color: #282828;
    line-height: 56rpx;
    height: 56rpx;
  }
  .f-content-text {
    font-size: $font-sx;
    color: $font-color-normal;
    line-height: 40rpx;
    font-weight: 400;
  }
  .f-font-bold {
    font-weight: 700;
  }
  .f-font-indent {
    text-indent: 52rpx;
  }
}
</style>