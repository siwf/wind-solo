<!--
 * @Description: 注册组件
 * @Autor: siwenfeng
 * @Date: 2021-10-15 13:35:06
 * @LastEditors: siwenfeng
 * @LastEditTime: 2022-04-19 10:07:24
-->
<template>
  <view class="f-public-register f-container-white">
    <view class="f-register-title">注册温风点火</view>
    <view class="f-register-wrap u-m-b-80">
      <u-form
        :rules="rules"
        :model="form"
        ref="uForm"
        :border-bottom="false"
        :error-type="errorType"
      >
        <u-form-item prop="mobile" :border-bottom="false">
          <u-input
            inputAlign="left"
            placeholder="请输入手机号码"
            :placeholder-style="placeholderStyle"
            v-model="form.mobile"
            type="number"
            maxlength="13"
            border
            focus
            @input="inputChange"
            :height="108"
            :trim="false"
          />
        </u-form-item>
      </u-form>
    </view>
    <view class="u-flex f-register-aggremnet u-m-b-32">
      <view style="width: 36rpx; height: 40rpx" class="u-flex u-m-r-4 u-m-b-4">
        <checkbox value="cb" :checked="false" @click="protocol = !protocol" />
      </view>
      <view class="f-aggrement-text">我已阅读并同意</view>
      <view class="f-text-value" @tap="showProtocal = true">
        《平台相关服务协议》
      </view>
    </view>
    <uni-common-button
      @click="next"
      title="下一步"
      :canClick="isDisabled"
      :isDisabled="isDisabled"
    ></uni-common-button>
    <view class="u-m-t-48 f-go-login" @tap="$Router.replace('/pages/public/login')"
      >已有账户，去登录</view
    >

    <u-popup
      v-model="showProtocal"
      :custom-style="customStyle"
      safe-area-inset-bottom
      mode="bottom"
      :bgStyle="{
        background: 'none',
      }"
    >
      <view class="f-agreement-wrap u-flex-col">
        <view class="f-agreement-list u-m-b-16">
          <view class="f-list-item f-list-border" @tap="privacyPolicy"> 隐私政策 </view>
          <view class="f-list-item" @tap="registrationAgreement"> 用户注册与使用协议 </view>
        </view>
        <view class="f-agreement-list u-m-b-16">
          <view class="f-list-item" @tap="showProtocal = false"> 取消 </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
// import { validateMobileNo } from "@/config/util";
export default {
  data() {
    return {
      showProtocal: false,
      protocol: false,
      customStyle: {
        backgroundColor: "none",
      },
      form: {
        mobile: "",
      },
      mobile: '',
      //   isDisabled: true,
      errorType: ["message", "border"],
      placeholderStyle:
        "height: 48rpx; line-height: 48rpx; fontSize: 32rpx;fontFamily: PingFangSC-Medium, PingFang SC;fontWeight: 400;color: #C7C7C7",
      rules: {
        mobile: [
          {
            validator: (rule, value, callback) => {
              if (!this.$api.util.validateMobileNo(value)) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            },
            trigger: ["blur"],
          },
        ],
      },
    };
  },
  methods: {
    privacyPolicy() {
      // const url = this.$IMG_URL + 'PrivacyPolicy.html'
      // this.$tools.routerTo(url)
      const content = `
          <h2 style="text-align: center;"><strong>隐私政策</strong></h2>
        <p>【温风点火】小程序非常重视保护您的隐私。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;为方便您登录、使用相关服务，以及为您提供更个性化的用户体验和服务，您在使用我们的服务时，我们可能会收集和使用您的相关信息。我们希望通过本隐私政策向您说明，在使用【温风点火】&nbsp;&nbsp;&nbsp;小程序（以下简称&ldquo;小程序&rdquo;）时，&nbsp;&nbsp;我们如何收集、使用、&nbsp;&nbsp;储存和披露您的信息，以及我们为您提供的访问、更新、控制和保护这些信息的方式。<strong><strong>本隐私政策与您所使用的小程序信息及个人隐私信息相关，希望您仔细阅读。</strong></strong><strong><strong><br /></strong></strong>&nbsp;&nbsp;<strong><strong>&nbsp;&nbsp;您阅读并同意本隐私政策后，即意味着您已经同意我们按照本隐私政策收集、使用、储存和披露您的相关信息，以及向您提供的控制和保护措施。</strong></strong><br /><strong><strong>&nbsp;</strong></strong><strong><strong>&nbsp;&nbsp;&nbsp;一、使用范围</strong></strong><br />&nbsp;&nbsp;&nbsp;&nbsp;1.1本隐私政策适用于小程序的所有服务，服务包括向您提供页面浏览、网站登录服务，以及通过小程序向您提供的技术服务等。<br />&nbsp;&nbsp;&nbsp;&nbsp;1.2本隐私政策中的&ldquo;信息&rdquo;特指第二条所收集的信息。<br /><strong><strong>&nbsp;</strong></strong><strong><strong>&nbsp;&nbsp;&nbsp;二、信息收集范围</strong></strong><br />&nbsp;&nbsp;&nbsp;&nbsp;2.1为完成小程序账户的注册、管理、实名认证等必要活动，<strong><strong>您需要提交真实、合法、有效的信息，包括但不限于您的姓名、身份证号码、身份证有效期、联系电话、人脸生物信息、微信昵称、头像等。</strong></strong><br />&nbsp;&nbsp;&nbsp;&nbsp;2.2您使用本服务时，可能收集已经经过您授权获取或主动填写的如下信息：<br />&nbsp;&nbsp;&nbsp;&nbsp;2.2.1日志信息，指您使用我们的服务时，系统可能通过自动采集的技术信息，包括：（1）设备或软件信息，例如您的移动设备、网页浏览器或用于接入我们服务的其他程序所提供的配置信息、您的IP&nbsp;地址和移动设备所用的版本和设备识别码。（2）有关您曾使用的移动应用和其他软件的信息，以及您曾经使用该等移动应用和软件的信息。（3）您通过我们的服务进行通讯的信息，例如曾通讯的账号。<br />&nbsp;&nbsp;&nbsp;&nbsp;2.2.2位置信息，指您开启设备定位功能并使用我们基于位置提供的相关服务。<br />&nbsp;&nbsp;&nbsp;&nbsp;2.2.3<strong><strong>您使用部分功能或服务时还应当提供使用该功能或服务所必须的信息，如在风险测评过程中，可能会根据您的答案提取到您受教育程度、收入情况、理财经验等相关信息，在音频视频录制过程中，我们将会保存您的录音录像信息。</strong></strong><strong><strong><br /></strong></strong><strong><strong>&nbsp;</strong></strong><strong><strong>&nbsp;&nbsp;&nbsp;三、如何收集信息</strong></strong><br />&nbsp;&nbsp;&nbsp;&nbsp;3.1我们通过您主动提交，以及在您使用我们的服务过程中产生相应的记录等方式收集您的信息。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;3.2 我们可能会通过数据埋点和其他相关技术收集和使用您的信息。我们使用数据埋点的具体用途包括：分析您使用我们服务的情况，以便为您提供周到的个性化服务，包括定制化页面、推荐等服务。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;3.3 通过小程序数据埋点记录的有关信息，将适用本隐私政策。</p>
        <p><strong><strong>&nbsp;&nbsp;&nbsp;&nbsp;四、信息使用</strong></strong></p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;4.1为了向您提供更加优质、便捷、安全的服务，在符合相关法律法规的前提下，<strong><strong>我们可能将收集的信息用作以下用途：</strong></strong><br />&nbsp;&nbsp;&nbsp;（1）向您提供服务（如实名认证信息、用来接收验证码的手机号，是继续获得服务的前提）。<br />&nbsp;&nbsp;&nbsp;（2）满足您的个性化需求。例如，个性化的帮助服务和提示，对您和其他用户作出其他方面的回应。<br />&nbsp;&nbsp;&nbsp;（3）服务优化和开发。例如，我们会根据小程序系统响应您的需求时产生的信息，优化我们的服务。<br />&nbsp;&nbsp;&nbsp;（4）保护您或其他用户或公众的人身财产安全免遭侵害，更好地预防钓鱼网站、欺诈、网络漏洞、计算机病毒、网络攻击、网络侵入等安全风险，更准确地识别违反法律法规或小程序相关协议、规则的情况，我们可能使用您的账号信息、并整合设备信息、有关网络日志、安全事件的检测及防范，并依法采取必要的记录、审计、分析、处置措施。例如，我们会将您的信息用于身份验证、安全防范、投诉处理、纠纷协调、诈骗监测等用途。您在使用安全功能或其他类似服务时，我们会对恶意程序或病毒进行检测，或为您识别诈骗信息。<br />&nbsp;&nbsp;&nbsp;（5）向您提供与您更加相关的服务。例如，向您提供您可能感兴趣的类似功能或服务等。<br />&nbsp;&nbsp;&nbsp;（6）邀请您参与有关我们产品和服务的调查。<br />&nbsp;&nbsp;&nbsp;（7）其他可能需要使用收集的信息的相关场景，如果使用场景与初始场景无合理的关联性，我们会在使用信息前重新征得您的同意。<br /><strong><strong>&nbsp;</strong></strong><strong><strong>&nbsp;&nbsp;&nbsp;五、信息共享、转让、披露</strong></strong><br />&nbsp;&nbsp;&nbsp;<strong><strong>&nbsp;5.1共享</strong></strong><br />&nbsp;&nbsp;&nbsp;&nbsp;我们不会与其他组织和个人共享您的用户信息，但以下情况除外：<br />&nbsp;&nbsp;&nbsp;&nbsp;5.1.1在获取明确同意的情况下共享：获得您的明确同意后，我们会与其他方共享您的用户信息；<br />&nbsp;&nbsp;&nbsp;&nbsp;5.1.2在法定情形下的共享:我们可能会根据法律法规规定、诉讼、仲裁解决需要，按照行政、司法机关依法提出的要求，对外共享您的用户信息；</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;5.1.3为了促成办理服务或协助解决争议，某些情况下只有共享您的用户信息，才能促成办理或处理您与他人的纠纷或争议。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;5.1.4 与授权合作伙伴共享：我们可能委托受信赖的合作伙伴来提供服务（如人脸识别服务），因此我们可能会与合作伙伴共享提供服务所必要的用户信息，以提供更好的客户服务和优化用户体验。<strong><strong>我们仅会出于合法、正当、必要、特定、明确的目的共享您的用户信息，并且只会共享提供服务所必须的用户信息。</strong></strong><strong><strong>我们的合作伙伴无权将共享的用户信息用于任何其他用途。</strong></strong><br />&nbsp;&nbsp;&nbsp;&nbsp;目前，我们的授权合作伙伴包括如下类型：供应商、服务提供商和其他合作伙伴。我们将信息发送给支持我们业务的供应商、服务提供商和其他合作伙伴，这些支持包括提供基础技术服务、提供实名认证、咨询等专业服务。<br />&nbsp;&nbsp;&nbsp;&nbsp;对我们与之共享用户信息的公司、组织和个人，我们会与其签署严格的保密协议以及信息保护约定，要求他们按照我们的说明、本隐私政策以及其他任何相关的保密和安全措施来处理用户信息。<br /><strong><strong>&nbsp;&nbsp;&nbsp;5.2转让</strong></strong><br />&nbsp;&nbsp;&nbsp;我们不会将您的用户信息转让给任何公司、组织和个人，但以下情况除外：<br />&nbsp;&nbsp;&nbsp;5.2.1在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的用户信息。<br /><strong><strong>&nbsp;&nbsp;&nbsp;5.3披露</strong></strong><br />&nbsp;&nbsp;&nbsp;未经您同意，我们不会与任何无关第三方分享您的信息，以下情形除外：<br />&nbsp;&nbsp;&nbsp;5.3.1我们可能将您的信息与我们的关联公司、第三方服务提供商、承包商及代理商分享，仅用作：提供&ldquo;二、信息收集范围&rdquo;中相应功能或服务所必需，以及出于&ldquo;四、信息使用&rdquo;中部分所述目的所必需。</p>
        <p><strong><strong>&nbsp;&nbsp;&nbsp;&nbsp;如我们与任何上述第三方分享您的信息，我们将努力确保第三方在使用您的信息时遵守本声明及我们要求其遵守的其他适当的保密和安全措施。</strong></strong><br />&nbsp;&nbsp;&nbsp;&nbsp;5.3.2随着我们业务的持续发展，我们以及我们的关联公司有可能进行合并、收购、资产重组或类似的交易，您的信息有可能作为此类交易的一部分而被转移。我们将遵守相关法律法规的要求，在转移前通知您，确保信息在转移时的机密性，以及变更后继续履行相应责任和义务。<br />&nbsp;&nbsp;&nbsp;&nbsp;5.3.3我们还可能因以下原因而披露您的信息：（1）遵守适用的法律法规等有关规定；（2）遵守法院判决、裁定或其他法律程序的规定；（3）遵守相关政府机关或其他有权机关的要求；（3）我们有理由确信需遵守法律法规等有关规定；（4）为执行相关服务协议或本隐私政策、维护社会公共利益、处理投诉/纠纷，保护我们的客户、我们或我们的关联公司、其他用户或雇员的人身和财产安全或合法权益所合理必需的用途；（5）经过您合法授权的情形。<br />&nbsp;&nbsp;&nbsp;&nbsp;如我们因上述原因而披露您的信息，我们将在遵守法律法规相关规定及本政策的基础上及时告知您。</p>
        <p><strong><strong>&nbsp;&nbsp;&nbsp;&nbsp;六、信息存储</strong></strong></p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;6.1 小程序收集的有关您的信息保存在本公司位于中国大陆的服务器。</p>
        <p><strong><strong>&nbsp;&nbsp;&nbsp;&nbsp;七、信息安全</strong></strong></p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;7.1我们努力保障信息安全，以防信息的丢失、不当使用、未经授权阅览或披露。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;我们使用各种安全技术以保障信息的安全。例如，我们将通过服务器备份、密码加密等安全措施，防止信息泄露、损毁、丢失。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;我们建立严格的管理制度和流程以保障信息的安全。例如，我们严格限制访问信息的人员范围，并进行审计，要求他们遵守保密义务。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;我们重视信息安全合规工作，并通过安全认证，以业界先进的解决方案充分保障您的信息安全。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;但请您理解，由于技术的限制以及可能存在的各种恶意手段，在互联网环境下，即便竭尽所能加强安全措施，也不可能始终保证信息百分之百的安全。您需要了解，您接入我们的服务所用的系统和通讯网络，有可能因我们可控范围外的因素而出现问题。</p>
        <p><strong><strong>&nbsp;&nbsp;&nbsp;&nbsp;若发生个人信息泄露等安全事件，我们会启动应急预案，阻止安全事件扩大，并以发送邮件、推送通知、公告等形式告知您相关情况，并向您给出安全建议。</strong></strong><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7.2为更有效的保障您的信息安全，我们也希望您能够加强自我保护意识。<strong><strong>我们仅在本小程序直接导致您个人信息泄露的范围内承担责任，因此，请您妥善保管您的账号及密码信息，避免您的个人信息泄露。</strong></strong>小程序账户及微信账户均有安全保护功能，<strong><strong>但您也需要妥善保护自己的个人信息，除非您判断认为必要的情形下，不向任何第三人提供您的账号密码等个人信息。</strong></strong><br />&nbsp;&nbsp;&nbsp;&nbsp;<strong><strong>八、访问与控制</strong></strong><br />&nbsp;&nbsp;&nbsp;&nbsp;8.1您可以在使用我们服务的过程中，访问、修改和删除您的相关信息。您访问、修改和删除信息的方式将取决于您使用的具体服务。<br />&nbsp;&nbsp;&nbsp;&nbsp;8.2如您发现我们违反法律法规的规定或者双方的约定收集、使用您的信息，您可以要求我们删除。如您发现我们收集、存储的您的信息有错误的，且无法自行更正的，您也可以要求我们更正。<br />&nbsp;&nbsp;&nbsp;&nbsp;8.3在访问、修改和删除相关信息时，我们可能会要求您进行身份验证，以保障账户安全。请您理解，由于技术所限、基于法律法规要求，您的某些请求可能无法响应。<br />&nbsp;&nbsp;&nbsp;&nbsp;8.4基于法律法规要求、保障信息安全等正当事由，您的部分信息可能无法访问、修改和删除。<br />&nbsp;&nbsp;&nbsp;&nbsp;8.5如您对上述权利实现存在疑问，可以根据&ldquo;十、与我们联系&rdquo;中的相关联系方式与我们取得联系。</p>
        <p><strong><strong>&nbsp;&nbsp;&nbsp;&nbsp;九、隐私政策的更新</strong></strong></p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;我们可能适时修订本隐私政策的条款，该等修订构成本《隐私政策》的一部分。如可能造成您在本隐私政策下的权利的实质性减少或扩大收集、使用信息的范围等重要规则变更时，我们将在修订生效前通过主页上显著位置弹窗提示或向您发送电子邮件或以其它方式通知您。在该种情形况下，<strong><strong>若您继续使用我们的服务，即表示同意受修订的本隐私政策的约束。</strong></strong></p>
        <p><strong><strong>&nbsp;&nbsp;&nbsp;&nbsp;十、与我们联系</strong></strong></p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;如您对本政策或其他相关事宜有疑问，<strong><strong>您可以通过</strong></strong><strong><strong>小程序</strong></strong><strong><strong>公布的联系方式进行咨询或根据我们提供的指引</strong></strong>，填写意见反馈。我们将尽快审核所涉问题，并在验证您的用户身份后予以回复。</p>
        `
      this.$Router.push({
        path: '/pages/content/richText',
        query: {
          content
        }
      })
    },
    registrationAgreement() {
      // const url = this.$IMG_URL + 'RegistrationAgreement.html'
      const content = `<h2 style="text-align: center;"><strong>用户注册与使用协议</strong></h2>
                      <p><strong><strong>&nbsp;&nbsp;&nbsp;&nbsp;一、特别提示</strong></strong></p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;1.1 【温风点火】小程序按照本协议的规定及其不时发布的操作规则提供基于互联网的相关服务（以下简称&ldquo;小程序服务&rdquo;），<strong><strong>为获得小程序服务，服务使用人（以下称&ldquo;用户&rdquo;）应当同意本协议的全部条款并按照页面上的提示完成全部的注册程序。用户在进行注册程序过程中点击"同意"按钮即表示用户完全接受本协议项下的全部条款。</strong></strong><strong><strong><br /></strong></strong>&nbsp;&nbsp;&nbsp;&nbsp;<strong><strong>2.1&nbsp;用户理解，本公司仅提供相关的小程序服务，除此之外与相关小程序服务有关的设备（如电脑、调制解调器及其他与接入互联网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费）均应由用户自行负担。<br />&nbsp;&nbsp;&nbsp;&nbsp;<strong><strong>三、</strong></strong><strong><strong>使用规则</strong></strong><br />&nbsp;&nbsp;&nbsp;<strong><strong>&nbsp;3.1</strong></strong><strong><strong>&nbsp;</strong></strong><strong><strong>用户在申请使用小程序服务时必须进行实名认证，用户应当按照实名认证操作流程规范操作，诚实信用，向本公司提供准确的个人资料，如个人资料有任何变动，必须及时更新。</strong></strong><br />&nbsp;&nbsp;&nbsp;&nbsp;<strong><strong>3.2</strong></strong><strong><strong>&nbsp;</strong></strong><strong><strong>用户注册成功后，小程序将给予每个用户一个用户帐号及相应的密码，该用户帐号和密码</strong></strong><strong><strong>由用户负责保管，用户应当对以其用户帐号进行的所有活动和事件负法律责任。</strong></strong><strong><strong><br /></strong></strong>&nbsp;&nbsp;&nbsp;<strong><strong>&nbsp;3.4</strong></strong><strong><strong>&nbsp;</strong></strong><strong><strong>小程序采用签名（章）信息图形化展现技术，用户可通过签名管理功能设置并管理签名（章）图片。用户认可小程序采用的电子签署策略，同意在小程序中使用数字证书进行电子签名，是用户确认和认可签名文件的真实意思表示，无论签名（章）图片所载内容为何，无论签名（章）图片显示位置为何。</strong></strong><strong><strong><br /></strong></strong><strong><strong>&nbsp;</strong></strong><strong><strong>&nbsp;&nbsp;&nbsp;</strong></strong>3.5&nbsp;用户在使用小程序服务过程中，必须遵循以下原则：<br />&nbsp;&nbsp;&nbsp;(a)&nbsp;遵守中国有关的法律和法规；<br />&nbsp;&nbsp;&nbsp;(b)&nbsp;不得为任何非法目的而使用小程序服务；<br />&nbsp;&nbsp;&nbsp;(c)&nbsp;遵守所有与小程序服务有关的网络协议、规定和程序；<br />&nbsp;&nbsp;&nbsp;(d)&nbsp;不得利用小程序服务进行任何可能对互联网的正常运转造成不利影响的行为；<br />&nbsp;&nbsp;&nbsp;(e)&nbsp;不得利用小程序服务传输任何骚扰性的、中伤他人的、辱骂性的、恐吓性的、庸俗淫秽的或其他任何非法的信息资料；<br />&nbsp;&nbsp;&nbsp;(f)&nbsp;不得利用小程序服务进行任何不利于本公司的行为；<br />&nbsp;&nbsp;&nbsp;(g)&nbsp;如发现任何非法使用用户帐号或帐号出现安全漏洞的情况，应立即通告本公司。<br />&nbsp;&nbsp;&nbsp;&nbsp;3.6&nbsp;如用户在使用小程序服务时违反任何上述规定，<strong><strong>本公司或及其授权的人有权要求用户改正或直接采取一切必要的措施（包括但不限于暂停或终止用户使用小程序服务的权利）以减轻用户不当行为造成的影响。</strong></strong><br />&nbsp;&nbsp;&nbsp;<strong><strong>&nbsp;</strong></strong><strong><strong>四、</strong></strong><strong><strong>内容所有权</strong></strong><br />&nbsp;&nbsp;&nbsp;&nbsp;4.1&nbsp;本公司提供的小程序服务内容可能包括：文字、图片、视频、图表、数据等。所有这些内容受版权、商标和其它财产所有权法律的保护。<br /><strong><strong>&nbsp;&nbsp;&nbsp;&nbsp;</strong></strong><strong><strong>五、</strong></strong><strong><strong>&nbsp;</strong></strong><strong><strong>隐私保护</strong></strong><br />&nbsp;&nbsp;&nbsp;&nbsp;5.1&nbsp;保护用户隐私是本公司的一项基本政策，本公司保证不对外公开或向第三提供用户注册资料及用户在使用小程序服务时存储在小程序的非公开内容，但下列情况除外：<br />&nbsp;&nbsp;&nbsp;(a)&nbsp;事先获得用户的明确授权；<br />&nbsp;&nbsp;&nbsp;(b)&nbsp;根据有关的法律法规要求；<br />&nbsp;&nbsp;&nbsp;(c)&nbsp;按照相关政府主管部门的要求；<br />&nbsp;&nbsp;&nbsp;(d)&nbsp;为维护社会公众的利益；<br/>&nbsp;&nbsp;&nbsp;(e)&nbsp;为维护本公司的合法权益；</p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;5.2 在不透露单个用户隐私资料的前提下，本公司有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。<br /><strong><strong>&nbsp;&nbsp;&nbsp;&nbsp;</strong></strong><strong><strong>六、</strong></strong><strong><strong>免责声明</strong></strong><br />&nbsp;&nbsp;&nbsp;<strong><strong>&nbsp;6.1</strong></strong><strong><strong>&nbsp;</strong></strong><strong><strong>用户明确同意其使用小程序服务所存在的风险将完全由其自己承担；因其使用小程序服务而产生的一切后果也由其自己承担，本公司对用户不承担任何责任。</strong></strong><strong><strong><br /></strong></strong><strong><strong>&nbsp;&nbsp;&nbsp;&nbsp;6.2</strong></strong><strong><strong>&nbsp;</strong></strong><strong><strong>本公司不担保小程序服务一定能满足用户的要求，也不担保小程序服务不中断，对小程序服务的及时性、安全性、准确性也都不作担保。</strong></strong><strong><strong><br /></strong></strong><strong><strong>&nbsp;&nbsp;&nbsp;&nbsp;6.3</strong></strong><strong><strong>&nbsp;</strong></strong><strong><strong>本公司不保证为向用户提供便利而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由本公司实际控制的任何网页上的内容，本公司不承担任何责任。</strong></strong><strong><strong><br /></strong></strong><strong><strong>&nbsp;&nbsp;&nbsp;&nbsp;6.4</strong></strong><strong><strong>&nbsp;</strong></strong><strong><strong>对于因不可抗力或本公司不能控制的原因造成的小程序服务中断或其它缺陷，本公司不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。</strong></strong><br />&nbsp;&nbsp;&nbsp;<strong><strong>&nbsp;</strong></strong><strong><strong>七、</strong></strong><strong><strong>服务变更、中断或终止</strong></strong><br />&nbsp;&nbsp;&nbsp;&nbsp;7.1&nbsp;如因小程序维护或升级的需要而需暂停小程序服务，本公司将尽可能事先进行通告。<br />&nbsp;&nbsp;&nbsp;<strong><strong>&nbsp;7.2</strong></strong><strong><strong>&nbsp;</strong></strong><strong><strong>如发生下列任何一种情形，本公司有权随时中断或终止向用户提供本协议下的小程序服务而无需通知用户：</strong></strong><br />&nbsp;&nbsp;&nbsp;&nbsp;(a)&nbsp;用户提供的个人资料不真实；<br />&nbsp;&nbsp;&nbsp;&nbsp;(b)&nbsp;用户违反本协议中规定的使用规则。<br />&nbsp;&nbsp;&nbsp;&nbsp;7.3&nbsp;除前款所述情形外，本公司同时保留在不事先通知用户的情况下随时中断或终止部分或全部小程序服务的权利，对于所有服务的中断或终止而造成的任何损失，本公司无需对用户或任何第三方承担任何责任。<br />&nbsp;&nbsp;&nbsp;<strong><strong>&nbsp;</strong></strong><strong><strong>八、</strong></strong><strong><strong>违约赔偿</strong></strong><br />&nbsp;&nbsp;&nbsp;<strong><strong>&nbsp;8.1</strong></strong><strong><strong>&nbsp;</strong></strong><strong><strong>用户同意保障和维护本公司及其他用户的利益，如因用户违反有关法律、法规或本协议项下的任何条款而给本公司或任何其他第三人造成损失，用户同意承担由此造成的损害赔偿责任。</strong></strong><br />&nbsp;&nbsp;&nbsp;&nbsp;<strong><strong>九、</strong></strong><strong><strong>协议修改</strong></strong><br />&nbsp;&nbsp;&nbsp;&nbsp;9.1&nbsp;本公司将有权随时修改本协议的有关条款，一旦本协议的内容发生变动，本公司将会通过适当方式向用户提示修改内容。<br />&nbsp;&nbsp;&nbsp;&nbsp;9.2&nbsp;如果不同意本公司对本协议相关条款所做的修改，用户有权停止使用小程序服务。<strong><strong>如果用户继续使用小程序服务，则视为用户接受本公司对本协议相关条款所做的修改。</strong></strong></p>
                      <p><strong><strong>&nbsp;&nbsp;&nbsp;&nbsp;十、法律管辖</strong></strong></p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;10.1 本协议的订立、执行和解释及争议的解决均应适用中国法律。</p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;10.2 如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，<strong><strong>任何一方均可向本公司所在地的人民法院提起诉讼</strong></strong>。<br />&nbsp;&nbsp;&nbsp;<strong><strong>&nbsp;</strong></strong><strong><strong>十一、</strong></strong><strong><strong>通知和送达</strong></strong><br />&nbsp;&nbsp;&nbsp;&nbsp;11.1&nbsp;本协议项下所有的通知均可通过重要页面公告、电子邮件或常规的信件传送等方式进行；<strong><strong>该等通知于发送之日视为已送达收件人</strong></strong>。<br /><strong><strong>&nbsp;&nbsp;&nbsp;&nbsp;</strong></strong><strong><strong>十二、</strong></strong><strong><strong>其他规定</strong></strong><br />&nbsp;&nbsp;&nbsp;&nbsp;12.1&nbsp;本协议内容包括本协议所有条款及已经发布的或将来可能发布的各类规则、政策、通知，本公司有权根据需要对其进行不定时修改，该等内容的变更不会损害用户的合法、正当利益。所有规则、政策、通知为本协议不可分割的一部分，与本协议正文具有同等法律效力。<br />&nbsp;&nbsp;&nbsp;&nbsp;12.2&nbsp;如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。<br />&nbsp;&nbsp;&nbsp;&nbsp;12.3&nbsp;本协议中的标题仅为方便而设，在解释本协议时应被忽略。</p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;12.4 本协议自您首次以勾选、点选或者点击确定等任意形式同意之时起生效。</p>
                      <p>&nbsp;</p>
                      <p>&nbsp;</p>`
      this.$Router.push({
        path: '/pages/content/richText',
        query: {
          content
        }
      })
    },
    // 手机号格式化
    inputChange(e) {
      this.$nextTick(() => {
        let str = e.toString().replace(/ /g, "");
        let len = str.length;
        switch (true) {
          case len > 11:
            str =
              str.substr(0, 3) +
              " " +
              str.substr(3, 4) +
              " " +
              str.substr(7, 4);
            break;
          case len > 7:
            str =
              str.substr(0, 3) + " " + str.substr(3, 4) + " " + str.substr(7);
            break;
          case len > 3:
            str = str.substr(0, 3) + " " + str.substr(3);
            break;
          default:
        }
        this.form.mobile = str;
      });             
    },
    next() {
      if (!this.protocol) {
        this.$u.toast('请先阅读并勾选平台相关服务协议')
        return
      }
      this.$u.toast('功能后续开放,敬请期待！');
      return
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          const mobile = this.form.mobile.replace(/\s*/g,"")
          this.$api.request.enterMobile({
            mobile
          }).then(res => {
            if (res.code === '0') {
              // 上线时要根据环境去访问html文件
              // btnCode = 1 为注册
              // btnCode = 2 忘记密码
              // btnCode = 3 修改密码
              const params = {
                btnCode: 1,
                mobile,
                stepToken: res.data.stepToken
              }
              const url = this.$IMG_URL + 'index.html?params=' + `${encodeURIComponent(JSON.stringify(params))}`
              // const url = 'http://localhost:8089/?params=' + `${encodeURIComponent(JSON.stringify(params))}`
              this.$tools.routerTo(url)
            } else {
              this.$u.toast(res.msg);
            }
          })
        }
      })
    },
  },
  computed: {
    isDisabled() {
      return !(this.form.mobile.length === 13);
    },
  },
  onLoad(options) {
   options.mobile && this.inputChange(options.mobile)
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
};
</script>


<style scoped lang="scss">
.f-public-register {
  padding: 76rpx 64rpx 0;
  background: $font-color-light;
  .f-register-wrap {
    //   box-shadow: 0px -2px 0px 0px rgba(240,240,240,1);
  }
  .f-register-title {
    height: 64rpx;
    font-size: $font-xxg;
    font-weight: 500;
    color: $font-color-base;
    line-height: 64rpx;
    margin-bottom: 96rpx;
  }
  .f-register-aggremnet {
    font-size: $font-sm;
    height: 40rpx;
    .f-aggrement-text {
      color: $font-color-msg;
    }
    .f-text-value {
      color: $font-color-spec;
    }
  }
  .f-go-login {
    text-align: center;
    height: 44rpx;
    font-size: $font-md;
    color: $font-color-normal;
    line-height: 44rpx;
  }
}
.f-agreement-wrap {
  padding: 0 18rpx 16rpx;
}
.f-agreement-list {
  background: $font-color-light;
  border-radius: 28rpx;
  .f-list-item {
    height: 112rpx;
    text-align: center;
    line-height: 112rpx;
    color: $font-color-spec;
    font-size: $font-xxl;
  }
  .f-list-border {
    border-bottom: 1px solid $border-color-dark;
  }
}
</style>