export interface Colab {
	creatorId: string; // 招待者ID
	visitorId: string; // 訪問者ID
	language: string; // 言語コード
	userId: string; // ユーザーID
	content: string; // コンテンツ
	contentTmp: string; // 一時コンテンツ
	textJP: string; // 日本語テキスト
	textEN: string; // 英語テキスト
	textLpJP: string; // 日本語LP
	textLpEN: string; // 英語LP
	textMedalJP: string; // 日本語メダル
	textMedalEN: string; // 英語メダル
	postDate: string; // 投稿日
	inviter:string;//宣伝者
	pageUserIds:string;//ページ共同作成者ID
}
export const emptyColab: Colab = {
	creatorId: '',
	visitorId: '',
	language: '',
	userId: '',
	content: '',
	contentTmp: '',
	textJP: '',
	textEN: '',
	textLpJP: '',
	textLpEN: '',
	textMedalJP: '',
	textMedalEN: '',
	postDate: '',
	inviter:'',
	pageUserIds:'',
};