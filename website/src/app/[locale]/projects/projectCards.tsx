import { projectExpandableCardGridType } from "./projectsContent";

const cards: projectExpandableCardGridType[] = [
  {
    title: "StreamKit Portal",
    times: "2024年01月25日 ~ 中断中",
    src: "/wp-content/product/streamkitportal.com.webp",
    ctaText: "Visit",
    ctaLink: "https://streamkitportal.vercel.app",
    description: () =>
      "ストリーマーおよび配信者向けの、ウィジェットなどのカスタマイズまたはテンプレートを提供するサービス。",
    content: () => {
      return (
        <>
          <p>
            DiscordやYoutubeなどのコミュニティーが提供しているウィジェットをOBSなどの録画アプリに表示させるときに、カスタマイズをしてオリジナルのデザインを作成できるようにしてみたいと思い開発を開始しました。
          </p>
          <p>
          専門的な知識のない初心者でもカスタマイズを作成できるようにUIコントロールを実装しており、さらに上級者向けにコードを書いて作成する機能もあります。カスタマイズは編集した値を常に適応しているためリアルタイムでプレビューを見ながら作成することができます。
          現在は、Discordが提供する全ウィジェットを実装後開発を一時中断しています。
          </p>
          <p>制作期間: 約5日間</p>
        </>
      );
    },
  },
  {
    title: "Scratch Status",
    times: "2024年12月20日 ~",
    src: "/wp-content/product/scratch-status.toakiryu.com.webp",
    ctaText: "Visit",
    ctaLink: "https://scratch-status.toakiryu.com",
    description: () =>
      "Scratchサービスの稼働状況をリアルタイムで監視し、稼働時間、バージョン、サーバー負荷、データベースの健康状態などの詳細なステータス情報を提供します。Scratchの主要なサービスとキャッシュ接続の状態を確認できます。",
    content: () => {
      return (
        <>
          <p>
            このプロジェクトは、Scratchサービスの稼働状況をリアルタイムで監視するために開発しました。サービスが利用できない際に、ユーザーがすぐに状況を確認できるようにしたいと考えたのがきっかけです。
          </p>
          <p>
            提供されているAPIを使用して、サービスの稼働状態を視覚的に表示し、ユーザーが直感的に把握できるUIを目指して設計しました。定期的にステータスを更新し、プログレスバーで最新の情報を反映させる機能を実装しています。
          </p>
          <p>制作期間: 約5時間</p>
        </>
      );
    },
  },
  {
    title: "GForm Quick Submit",
    times: "2024年12月17日 ~",
    src: "/wp-content/product/gform-quick-submit.toakiryu.com.webp",
    ctaText: "Visit",
    ctaLink: "https://gform-quick-submit.toakiryu.com",
    description: () =>
      "Google フォームにデータを素早く送信できるパッケージです。このツールを使えば、お問い合わせフォームなどを簡単にウェブサイトに統合できます。無料でGoogleフォームを利用可能なので、初心者の方にも最適です。",
    content: () => {
      return (
        <>
          <p>
            お問い合わせフォームなどの簡単なデータ送信機能を、ウェブサイトに統合したいと考え、このパッケージを制作しました。多くのサービスが存在する中で、無料で使えるGoogleフォームに注目し、手軽に利用できる方法を提供したいと思ったのがプロジェクトの始まりです。
          </p>
          <p>
            Googleフォームは無料で利用できるものの、フォーム項目に対応するIDを取得する必要があり、その点が利用者にとっての障壁となっていました。そこで、項目のIDを簡単に検出できる解析ツールを追加し、Googleフォームの利用をさらにスムーズにしました。
          </p>
          <p>制作期間: 約15時間</p>
        </>
      );
    },
  },
  {
    title: "Support Scripts",
    times: "2024年12月8日 ~ 2024年12月20日",
    src: "/wp-content/product/support-scripts.toakiryu.com.webp",
    ctaText: "Visit",
    ctaLink: "https://support-scripts.toakiryu.com",
    description: () =>
      "Minecraftにおけるプレイヤーの位置情報などを簡単に取得できるようにするデータパックです。",
    content: () => {
      return (
        <>
          <p>
            このプロジェクトは、趣味で制作していたMinecraftのデータパックを配布するために始まりました。最初は人気の配布サイトに投稿するつもりでしたが、不要な機能が多く、サイトのデザインも自分の好みに合わなかったため、独自の配布サイトを作成することに決めました。
          </p>
          <p>
            サイトはシンプルで使いやすさを重視し、特にデータパックを簡単にダウンロードできるように設計しています。デザインやユーザビリティの向上に力を入れ、より多くのユーザーにとって魅力的なサイトを目指しました。
          </p>
          <p>制作期間: 約5時間</p>
        </>
      );
    },
  },
  {
    title: "Craft Recycle",
    times: "2024年11月24日 ~ 2024年12月20日",
    src: "/wp-content/product/craftrecycle.toakiryu.com.webp",
    ctaText: "Visit",
    ctaLink: "https://craftrecycle.toakiryu.com",
    description: () =>
      "Minecraftのアイテムやブロックをリサイクル可能にするためのレシピを追加し、新たなクラフト体験を提供するデータパックです。",
    content: () => {
      return (
        <>
          <p>
            このプロジェクトもMinecraftのデータパックを配布する目的で作成しました。アイテムやブロックをリサイクルできる新しいレシピを導入することで、プレイヤーに新たな体験を提供したいと考えたのがきっかけです。
          </p>
          <p>
            配布サイトの作成は、既存のサイトに満足できなかったため、独自にデザインと機能を工夫し、シンプルで使いやすいものに仕上げました。Minecraftファンにとって魅力的なサイトにすることを意識しています。
          </p>
          <p>制作期間: 約5時間</p>
        </>
      );
    },
  },
  {
    title: "ぶいすぽDB",
    times: "2024年10月18日 ~ 2024年10月21日",
    src: "/wp-content/product/vspodb.vercel.app.webp",
    ctaText: "Visit",
    ctaLink: "https://vspodb.vercel.app",
    description: () =>
      "ぶいすぽっ！の情報データベースサイトです。メンバーの詳細情報から実績、見所など、役立つ情報を簡単に見つけることができます。",
    content: () => {
      return (
        <>
          <p>
            VTuberのコンテンツを楽しむようになったことから、VTuberに関する情報を簡単に探せるサイトを作成しようと決心しました。多くの情報が分散していて、効率的にアクセスできる場所がなかったため、専用のデータベースサイトを立ち上げました。
          </p>
          <p>
            サイトは現在限定公開状態ですが、使用許可が得られた情報を元に、今後公開予定です。ユーザーが簡単に情報を検索できるように設計されています。
          </p>
          <p>制作期間: 約15時間</p>
        </>
      );
    },
  },
  {
    title: "Scratch Auth",
    times: "2024年10月5日 ~",
    src: "/wp-content/product/scratch-auth.webp",
    ctaText: "Visit",
    ctaLink: "https://github.com/scratch-auth/pkg",
    description: () =>
      "Scratch用のシンプルなOAuthサービスで、開発者にはわかりやすいAPIを、ユーザーにはスムーズなログイン体験を提供します。これを使用すると、WebサイトにOAuth機能を簡単に実装できます。",
    content: () => {
      return (
        <>
          <p>
            ScratchのOAuth認証機能を簡単に実装できるパッケージを制作することを決めました。これにより、開発者は複雑な設定をすることなく、簡単にログイン機能を提供できるようになります。
          </p>
          <p>
            また、設定ファイル一つでAPIを簡潔に構成できるようにし、より簡単に利用できるように設計しました。
          </p>
          <p>制作期間: 約5時間</p>
        </>
      );
    },
  },
  {
    title: "Next.js Rich Template",
    times: "2024年6月26日 ~",
    src: "/wp-content/product/nextjs-rich-tpl.toakiryu.com.webp",
    ctaText: "Visit",
    ctaLink: "https://nextjs-rich-tpl.toakiryu.com",
    description: () =>
      "Next.jsを使用してモダンなWebアプリケーションを構築するための堅牢なスタートポイントを提供するテンプレートです。ローカリゼーションやテーマ切り替え機能を事前に組み込み、さらに簡単に開発を開始できます。",
    content: () => {
      return (
        <>
          <p>
            このテンプレートは、Next.jsの開発を加速するための出発点として作成しました。すでに多くの機能が組み込まれているため、ローカリゼーションやテーマ切り替え機能が必要な場合でも、すぐに開発を開始できます。
          </p>
          <p>
            特に、ReactやNext.jsを使ったプロジェクトを効率よく構築できるように、開発者向けに便利な機能を事前に整えたテンプレートです。これにより、開発にかかる時間を大幅に短縮できます。
          </p>
          <p>制作期間: 約30時間</p>
        </>
      );
    },
  },
  {
    title: "ScPay",
    times: "2024年6月10日 ~",
    src: "/wp-content/product/scpay.vercel.app.webp",
    ctaText: "Visit",
    ctaLink: "https://scpay.vercel.app",
    description: () =>
      "Scratchアカウントを当サービスと連携して、ゲームの進捗情報などのデータを同期します。開発者向けに認証サービスも提供します。",
    content: () => {
      return (
        <>
          <p>
            ScPayは、Scratchプラットフォームと連携し、ユーザーのゲーム進捗情報を同期できるサービスです。プロジェクトの始まりは、友人がScratchで進行中のプロジェクト「ScPay」を立ち上げたいと考え、そのウェブサイトとデータベースの構築を私が担当したことから始まりました。目標は、ユーザーが簡単に自分の進捗を他のユーザーと共有でき、さらに開発者向けに認証機能を提供することでした。
          </p>
          <p>
            このサービスは、定期的なアップデートを通じて最新の技術をサポートし続けています。特に、開発者向けには多様な認証手段を提供しており、より多くのゲームやアプリケーションに適用できるようになっています。サーバー側でのデータ同期とセキュリティにも配慮し、高いパフォーマンスを維持しています。
          </p>
          <p>制作期間: 約6ヶ月間</p>
        </>
      );
    },
  },
  {
    title: "Zshmgr",
    times: "2024年5月17日 ~ 2024年9月25日",
    src: "/wp-content/product/zshmgr.vercel.app.webp",
    ctaText: "Visit",
    ctaLink: "https://zshmgr.vercel.app",
    description: () =>
      "Zsh用のシンプルなパッケージマネージャーです。ユーザーはパッケージのインストール、アンインストール、アップデート、リスト表示を簡単に行うことができます。このツールはGitHubリポジトリとシームレスに連携するように設計されており、Zshスクリプトやツールの管理が容易になります。",
    content: () => {
      return (
        <>
          <p>
            Zshmgrは、Zshシェル環境で簡単にパッケージ管理ができるツールです。自分自身の作業を効率化するために、Zsh環境用にカスタムコマンドやツールを管理できるパッケージマネージャーが必要だと感じ、開発を始めました。Zshでよく使用されるコマンドやツールを効率的にインストール、更新、削除できるように設計しました。
          </p>
          <p>
            基本的な機能に特化しており、インストール、アンインストール、パッケージリストの表示など、シンプルかつ直感的に使えるようになっています。GitHubリポジトリともシームレスに連携できるため、ユーザーは簡単に自分のツールを管理することができます。後に、より多機能化を目指してアップデートを行いました。
          </p>
          <p>制作期間: 約28時間 / アーカイブ済み</p>
        </>
      );
    },
  },
  {
    title: "Scratch Auth React",
    times: "2024年3月30日 ~ 2024年10月4日",
    src: "/wp-content/product/scratch-auth-react.webp",
    ctaText: "Visit",
    ctaLink: "https://www.npmjs.com/package/scratch-auth-react",
    description: () =>
      "Scratch AuthはScratch用のシンプルなOAuthサービスです。開発者にはわかりやすいAPIを、エンドユーザーにはスムーズなログイン体験を提供します。scratch-auth-react を使うことで更に簡単にOAuth機能をサイトに実装することができます。",
    content: () => {
      return (
        <>
          <p>
            Scratch Auth
            Reactは、Scratchアカウントで簡単にログイン機能を実装できるように設計されたOAuthサービスです。このプロジェクトのきっかけは、Scratchアカウントを使ったログイン機能をウェブサイトに統合したいというニーズからでした。開発者にとっては、複雑なScratch
            Auth APIを簡潔に利用できるような仕組みが求められていました。
          </p>
          <p>
            このパッケージでは、APIの設定を最小限にして、複雑な認証プロセスを簡単に組み込むことができるよう工夫しました。その後、Scratch
            Authの進化に伴い、プロジェクトは@scratch-authという名前で新たな形で再発展しましたが、当初のコンセプトはそのまま引き継がれています。
          </p>
          <p>制作期間: 約14時間 / アーカイブ済み</p>
        </>
      );
    },
  },
  {
    title: "Scratch Building",
    times: "2024年3月8日 ~ 2024年8月1日",
    src: "/wp-content/product/scratch-building.vercel.app.webp",
    ctaText: "Visit",
    ctaLink: "https://scratch-building.vercel.app",
    description: () =>
      "ビル経営ゲームはScratchプラットフォーム上で開発されたゲームであり、このサイトは公式ウェブサイトとして機能します。アカウント認証、コメント、通知、コミュニティ参加など、さまざまな機能を提供しています。",
    content: () => {
      return (
        <>
          <p>
            Scratch
            Buildingは、人気のあるScratchプラットフォーム上で開発されたビル経営ゲームの公式ウェブサイトとして、ゲームのプレイヤーと開発者を繋げる役割を果たしています。このプロジェクトの開始は、ゲームの公式ウェブサイトに貢献したいという思いからでした。当初はHTMLで作られたサイトに、コメント機能などを追加していましたが、その後、Next.jsを用いてサイト全体の刷新を進めました。
          </p>
          <p>
            新しいサイトでは、ユーザーアカウント機能を実装し、Scratch
            Authを使用したログイン機能も提供しました。さらに、コメント機能、通知機能、アイテムショップのプレビューページなど、より多くのインタラクティブな機能を追加しました。ゲームの進行に影響を与えるイベントや通知もサイト内で確認できるようにし、ユーザー体験を大きく向上させました。
          </p>
          <p>制作期間: 約6ヶ月間</p>
        </>
      );
    },
  },
  {
    title: "Safe Encode",
    times: "2024年2月29日 ~ 2024年9月17日",
    src: "/wp-content/product/safe-encode.vercel.app.webp",
    ctaText: "Visit",
    ctaLink: "https://safe-encode.vercel.app",
    description: () =>
      "セキュリティとプライバシーを重視したデータのエンコードおよびデコードのためのツールです。SafeEncodeは、機密情報や個人情報などの重要なデータを安全に変換し、安全な形式で保存および転送することを目的としています。このツールは、安全な通信やデータベースへの保存などの様々なセキュアなデータ処理に利用できます。",
    content: () => {
      return (
        <>
          <p>
            Safe
            Encodeは、データの暗号化と復号化を簡単に行うためのツールです。セキュリティとプライバシーを重視し、個人情報や機密情報を安全に処理できるように設計しました。暗号化技術に興味を持ち、その利用方法を学んだことから、このプロジェクトが始まりました。
          </p>
          <p>
            ユーザーは、キーと内容を指定するだけでデータを暗号化したり復号化したりできます。この簡単なインターフェースにより、セキュアなデータ処理が可能になり、企業や個人での情報管理が簡単かつ安全になります。APIとしても利用でき、さまざまな場面で活用できるように設計されています。
          </p>
          <p>制作期間: 約48時間 / アーカイブ済み</p>
        </>
      );
    },
  },
];

export default cards